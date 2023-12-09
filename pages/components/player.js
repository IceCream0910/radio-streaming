import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Hls from 'hls.js';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import IonIcon from '@reacticons/ionicons'
import BottomNav from './bottomNav';
import { useRecoilState } from 'recoil';
import { playerData, favoritesData } from '../../states/states';
import toast from 'react-hot-toast';
import '@material/web/ripple/ripple.js';

const HlsPlayer = forwardRef((props, ref) => {
    const [player, setPlayer] = useRecoilState(playerData);
    const [favorites, setFavorites] = useRecoilState(favoritesData);
    const [actualFavorites, setActualFavorites] = useState([])

    const videoRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const isNative = useRef(null);

    const [currentProgram, setCurrentProgram] = useState('');
    const [currentSong, setCurrentSong] = useState('');
    const intervalSongFetch = useRef(null);
    const intervalProgramFetch = useRef(null);

    useEffect(() => {
        setActualFavorites(favorites);
    }, [favorites]);

    const handleNativePlayerState = (state) => {
        console.log("native state:", state)
        if (state == 'playing') {
            setIsPlaying(true);
            setIsBuffering(false);
        } else if (state == 'paused') {
            setIsPlaying(false);
            setIsBuffering(false);
        } else if (state == 'buffer') {
            setIsPlaying(false);
            setIsBuffering(true);
        }
    };

    useImperativeHandle(ref, () => ({
        nativePlayerState: handleNativePlayerState,
    }));

    useEffect(() => {
        setIsReady(true);
        const useragent = navigator.userAgent;
        isNative.current = useragent.indexOf('AndroidNative') > -1;
    }, []);

    useEffect(() => {
        if (intervalSongFetch.current) {
            clearInterval(intervalSongFetch.current);
            intervalSongFetch.current = null;
        }
        if (intervalProgramFetch.current) {
            clearInterval(intervalProgramFetch.current);
            intervalProgramFetch.current = null;
        }

        randomBackground();
        if (player.song) {
            const fetchSongData = async () => {
                try {
                    const response = await fetch(player.song);
                    const data = await response.json();
                    if (data.song) {
                        setCurrentSong('♬ ' + data.song);
                    } else {
                        setCurrentSong('');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchSongData()
            intervalSongFetch.current = setInterval(fetchSongData, 15000);
        } else { setCurrentSong('') }
        if (player.program) {
            const fetchProgramData = async () => {
                try {
                    const response = await fetch(player.program);
                    const data = await response.json();

                    if (data.title) {
                        setCurrentProgram(data.title);
                    } else {
                        setCurrentProgram('');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchProgramData();
            intervalProgramFetch.current = setInterval(fetchProgramData, 60 * 1000);

        } else { setCurrentProgram('') }

        if (isNative.current && player.url) {
            try {
                Native.play(player.url, player.title || "제목없음");
                setIsPlaying(true);
            } catch (error) {
                console.log("native error:", error)
            }
        } else {
            if (Hls.isSupported() && player) {
                const video = videoRef.current;
                const hls = new Hls();

                if (player && player.url) {
                    hls.loadSource(player.url.trim());
                    hls.attachMedia(video);

                    video.addEventListener('canplaythrough', () => {
                        video.play();
                        setIsPlaying(true);
                    });

                    if ('mediaSession' in navigator) {
                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: player.title || '제목없음',
                            artist: '라디오'
                        });
                    }
                }

                return () => {
                    hls.destroy();
                };
            }
        }

        return () => {
            if (intervalSongFetch.current) {
                clearInterval(intervalSongFetch.current);
            }
            if (intervalProgramFetch.current) {
                clearInterval(intervalProgramFetch.current);
            }
        };
    }, [player]);

    function randomBackground() {
        const colors = [
            { design: '#ff9a9e', research: '#fad0c4' },
            { design: '#a18cd1', research: '#fbc2eb' },
            { design: '#ffecd2', research: '#fcb69f' },
            { design: '#fbc2eb', research: '#a6c1ee' },
            { design: '#84fab0', research: '#8fd3f4' },
            { design: '#a1c4fd', research: '#c2e9fb' },
            { design: '#30cfd0', research: '#330867' },
            { design: '#9890e3', research: '#b1f4cf' },
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const selectedColor = colors[randomIndex];

        document.documentElement.style.setProperty('--color-design', selectedColor.design);
        document.documentElement.style.setProperty('--color-research', selectedColor.research);
    }

    useEffect(() => {
        if (videoRef.current && !isNative.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    function setNativePlayerPlaying(is) {
        if (isNative.current) {
            if (is) {
                Native.pause();
            } else {
                Native.pause();
            }
        }
    }

    const toggleFavorites = (title) => {
        if (favorites.includes(title)) {
            setFavorites(favorites.filter(favorite => favorite !== title));
            toast.dismiss();
            toast('자주 듣는 목록에서 제거했어요.', {
                icon: '🗑️',
                duration: 2000,
                position: 'bottom-center',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    width: '100%',
                    textAlign: 'left'
                }
            });
        } else {
            setFavorites([...favorites, title]);
            toast.dismiss();
            toast('자주 듣는 목록에 추가했어요.', {
                icon: '❤️', duration: 2000,
                position: 'bottom-center',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    width: '100%',
                    textAlign: 'left'
                }
            });
        }
    }

    function copyToClipboard(text) {
        window.navigator.clipboard.writeText(text).then(() => {
            toast.dismiss();
            toast('현재 곡 정보를 클립보드에 복사했어요', {
                duration: 2000,
                position: 'bottom-center',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    width: '100%',
                    textAlign: 'left'
                }
            });
        });
    }

    return (<>
        {isReady && player.title && <SwipeableBottomSheet
            open={isOpen}
            onChange={(e) => setIsOpen(e)}
            topShadow={true}
            shadowTip={false}
            bodyStyle={{ backgroundColor: '#1f1f1f', borderRadius: '20px 20px 0 0' }}
            style={isOpen ? { backgroundColor: '#1f1f1f', borderRadius: '20px', bottom: '0' } : { backgroundColor: '#1f1f1f', borderRadius: '20px', bottom: '60px' }}
            overflowHeight={isOpen ? 0 : 60}>

            <md-ripple></md-ripple>
            <div style={{ height: '95dvh' }}>
                {isOpen &&
                    <div className='bottom-sheet-handle'></div>}
                <div className='player-header'>
                    <div className={isOpen ? 'player-header-title open' : 'player-header-title'} onClick={() => setIsOpen(true)}>
                        {player && (!isOpen ? player.title : '지금 재생 중')}
                        {player == [] && '재생 중인 스테이션 없음'}
                    </div>
                    {!isOpen && player &&
                        <div className='player-header-close' onClick={() => [setNativePlayerPlaying(isPlaying ? false : true), setIsPlaying(!isPlaying)]}>
                            {isBuffering ? <div className='loader' />
                                : isPlaying ? <IonIcon name='pause' /> : <IonIcon name='play' />}
                        </div>
                    }
                </div>

                {player &&
                    <div className='player-body'>
                        <div className='player-body-title'>
                            {player && player.title}
                        </div>

                        <span>{currentProgram}</span><br />
                        <span style={{ opacity: 0.7 }} onClick={() => copyToClipboard(currentSong.replace('♬ ', ''))}>{currentSong}</span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between', marginTop: `${currentProgram ? '20px' : '0'}` }}>
                            <div className='player-playpause-btn' onClick={() => [setNativePlayerPlaying(isPlaying ? false : true), setIsPlaying(!isPlaying)]}>
                                {isBuffering ? <div className='loader' />
                                    : isPlaying ? <IonIcon name='pause' /> : <IonIcon name='play' />}
                            </div>


                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div className={actualFavorites.includes(player.title) ? 'player-heart-btn active' : 'player-heart-btn'} onClick={() => toggleFavorites(player.title)}>
                                    {actualFavorites.includes(player.title) ? <IonIcon name='heart' /> : <IonIcon name='heart-outline' />}
                                </div>
                                {isNative.current && <div className={'player-heart-btn'} onClick={() => Native.setSleepTimer()}>
                                    <IonIcon name='moon-outline' />
                                </div>}

                            </div>

                        </div>

                    </div>
                }

                {isOpen && isPlaying && <div className="circles">
                    <div className="circle research"></div>
                    <div className="circle design"></div>
                </div>}

                <video autoPlay style={{ display: 'none' }}
                    ref={videoRef} />
            </div>

        </SwipeableBottomSheet>}



        {!isOpen && <BottomNav />}

    </>
    );
});

export default HlsPlayer;
