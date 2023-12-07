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
        randomBackground();
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

    return (<>
        {isReady && player.title && <SwipeableBottomSheet
            open={isOpen}
            onChange={(e) => setIsOpen(e)}
            topShadow={true}
            shadowTip={false}
            bodyStyle={{ backgroundColor: '#1f1f1f', borderRadius: '20px 20px 0 0' }}
            style={isOpen ? { backgroundColor: '#1f1f1f', borderRadius: '20px', bottom: '0' } : { backgroundColor: '#1f1f1f', borderRadius: '20px', bottom: '60px' }}
            overflowHeight={60}>
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

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
                            <div className='player-playpause-btn' onClick={() => [setNativePlayerPlaying(isPlaying ? false : true), setIsPlaying(!isPlaying)]}>
                                {isBuffering ? <div className='loader' />
                                    : isPlaying ? <IonIcon name='pause' /> : <IonIcon name='play' />}
                            </div>

                            <div className={actualFavorites.includes(player.title) ? 'player-heart-btn active' : 'player-heart-btn'} onClick={() => toggleFavorites(player.title)}>
                                {actualFavorites.includes(player.title) ? <IonIcon name='heart' /> : <IonIcon name='heart-outline' />}
                            </div>

                        </div>

                    </div>
                }

                {isOpen && <div className="circles">
                    <div className="circle research"></div>
                    <div className="circle design"></div>
                </div>}

                <video autoPlay style={{ display: 'none' }}
                    ref={videoRef} />
            </div>

            <md-ripple></md-ripple>
        </SwipeableBottomSheet>}



        {!isOpen && <BottomNav />}

    </>
    );
});

export default HlsPlayer;
