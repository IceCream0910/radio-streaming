import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Hls from 'hls.js';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import IonIcon from '@reacticons/ionicons'
import BottomNav from './bottomNav';
import { useRecoilState } from 'recoil';
import { playerData, favoritesData } from '../../states/states';
import toast from 'react-hot-toast';
import '@material/web/ripple/ripple.js';
import TimerModal from './timerModal';
import { createClient } from '@supabase/supabase-js'

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
    const isSidebar = useRef(null);

    const [currentProgram, setCurrentProgram] = useState('');
    const [currentSong, setCurrentSong] = useState('');
    const intervalSongFetch = useRef(null);
    const intervalProgramFetch = useRef(null);

    const [isOpenTimerModal, setIsOpenTimerModal] = useState(false);

    const [isMobile, setIsMobile] = useState(true);
    const [isFocusing, setIsFocusing] = useState(true);

    //supabase
    const SUPABASE_URL = "https://ruyftwvajwpaxecjejtg.supabase.co" || process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eWZ0d3ZhandwYXhlY2planRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzg2NTU5NywiZXhwIjoyMDE5NDQxNTk3fQ._5rR3AJQJ45bNAmNTIqkVQSVqpTth5E8ukGcgFDrboA" || process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const [userCnt, setUserCnt] = useState(1);
    const [prevChannelId, setPrevChannelId] = useState(null);

    const [isPlayerAnimation, setIsPlayerAnimation] = useState(true);


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

    const handleNativeBack = () => {
        if (isOpenTimerModal) {
            setIsOpenTimerModal(false);
        }
        else if (isOpen) {
            setIsOpen(false);
        } else {
            if (window.history.state.url != '/') {
                window.history.back();
            } else {
                isNative.current && Native.backHandlerApp();
            }
        }
    };

    useImperativeHandle(ref, () => ({
        nativePlayerState: handleNativePlayerState,
        nativeBackHandler: handleNativeBack
    }));

    useEffect(() => {
        setIsReady(true);
        const useragent = navigator.userAgent;
        isNative.current = useragent.indexOf('AndroidNative') > -1;
        isSidebar.current = useragent.indexOf('sidebar') > -1;

        window.addEventListener("blur", () => {
            setIsFocusing(false)
        });
        window.addEventListener("focus", () => {
            setIsFocusing(true)
        });

        const mediaQuery = window.matchMedia('(max-width: 952px)');
        if (mediaQuery.matches) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }

        mediaQuery.addEventListener('change', () => {
            if (mediaQuery.matches) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        });

        setTimeout(() => {
            if (typeof window !== 'undefined' && window.localStorage.getItem('isPlayerAnimation')) {
                setIsPlayerAnimation(window.localStorage.getItem('isPlayerAnimation'));
            } else {
                setIsPlayerAnimation(true);
            }
        }, 100);

        return () => {
            mediaQuery.removeEventListener('change', () => {
                if (mediaQuery.matches) {
                    setIsMobile(true);
                } else {
                    setIsMobile(false);
                }
            });
            window.removeEventListener("blur", () => {
                setIsFocusing(false)
            });
            window.removeEventListener("focus", () => {
                setIsFocusing(true)
            });
            if (prevChannelId) {
                disconnectFromRealtimeServer();
            }
        }

    }, []);

    const pageExitEvent = async () => {
        await supabase.removeAllChannels();
        const id = player.url.trim().replaceAll('https://', '').replaceAll('http://', '').replace('/api/stream?', '').replace('radio.yuntae.in', '');

        const { data, error } = await supabase
            .from('user_count')
            .select('ch, count')
            .eq('ch', id);

        if (data.length > 0) {
            await supabase
                .from('user_count')
                .update({ count: data[0].count - 1 })
                .eq('ch', id);
        }
        console.log("disconnect", id)
    }

    useEffect(() => {
        if (isOpen && isMobile) {
            document.body.style.overflow = 'hidden';
            const css = `
            header {
                z-index: 0;
            }
        `;
            const styleElement = document.createElement('style');
            styleElement.innerHTML = css;
            document.head.appendChild(styleElement);
        } else {
            document.body.style.overflow = 'auto';
            const css = `
            header {
                z-index: 1;
            }
        `;
            const styleElement = document.createElement('style');
            styleElement.innerHTML = css;
            document.head.appendChild(styleElement);
        }
    }, [isOpen]);


    useEffect(() => {
        if (intervalSongFetch.current) {
            clearInterval(intervalSongFetch.current);
            intervalSongFetch.current = null;
        }
        if (intervalProgramFetch.current) {
            clearInterval(intervalProgramFetch.current);
            intervalProgramFetch.current = null;
        }
        setCurrentProgram('');
        setCurrentSong('');

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
                        if ('mediaSession' in navigator) {
                            navigator.mediaSession.metadata = new MediaMetadata({
                                title: data.title || '제목없음',
                                artist: player.title || '제목없음',
                                artwork: [{
                                    src: "/albumart.png",
                                    sizes: "500x500",
                                    type: "image/png",
                                }]
                            });
                        }
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

            const id = player.url.trim().replaceAll('https://', '').replaceAll('http://', '').replace('/api/stream?', '').replace('radio.yuntae.in', '')
            if (prevChannelId && prevChannelId != id) {
                disconnectFromRealtimeServer();
            }

            try {
                Native.play(player.url, player.title || "제목없음");
                setPrevChannelId(id);
                connectToRealtimeServer(id);
                setIsPlaying(true);
            } catch (error) {
                console.log("native error:", error)
            }
        } else {
            if (Hls.isSupported() && player) {
                const video = videoRef.current;
                const hls = new Hls();

                if (player && player.url) {
                    const id = player.url.trim().replaceAll('https://', '').replaceAll('http://', '').replace('/api/stream?', '').replace('radio.yuntae.in', '')
                    if (prevChannelId && prevChannelId != id) {
                        disconnectFromRealtimeServer();
                    }

                    hls.loadSource(player.url.trim());
                    hls.attachMedia(video);
                    setPrevChannelId(id);
                    connectToRealtimeServer(id);

                    video.addEventListener('canplaythrough', () => {
                        video.play();
                        setIsPlaying(true);
                    });

                    if ('mediaSession' in navigator) {
                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: player.title || '제목없음',
                            artist: '라디오 스트리밍 중',
                            artwork: [{
                                src: "/albumart.png",
                                sizes: "500x500",
                                type: "image/png",
                            }]
                        });
                    }
                }

                return () => {
                    hls.destroy();
                };
            }
        }

        // 페이지 나갈때
        window.addEventListener("beforeunload", async function (event) {
            event.preventDefault();
            await pageExitEvent();
            event.returnValue = "이 페이지를 벗어나면 라디오가 종료됩니다.";
            return '';
        });


        return () => {
            if (intervalSongFetch.current) {
                clearInterval(intervalSongFetch.current);
            }
            if (intervalProgramFetch.current) {
                clearInterval(intervalProgramFetch.current);
            }

            window.removeEventListener("beforeunload", async function (event) {
                event.preventDefault();
                await pageExitEvent();
                event.returnValue = "이 페이지를 벗어나면 라디오가 종료됩니다.";
                return '';
            });
        };
    }, [player]);


    const connectToRealtimeServer = (channelId) => {
        console.log(channelId);
        const run = async () => {
            const { data, error } = await supabase
                .from('user_count')
                .select('ch, count')
                .eq('ch', channelId);

            if (data.length > 0) {
                // 기존 채널에 업데이트
                await supabase
                    .from('user_count')
                    .update({ count: data[0].count + 1 })
                    .eq('ch', channelId)
                setUserCnt(data[0].count + 1);
                await supabase
                    .channel(channelId)
                    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_count', filter: 'ch=eq.' + channelId }, handleInserts)
                    .subscribe();
            } else {
                // 새 채널 생성
                await supabase
                    .from('user_count')
                const randomId = Math.floor(Math.random() * 9000000000) + 1000000000;
                await supabase
                    .from('user_count')
                    .insert({ id: randomId, ch: channelId, count: 1 });
                setUserCnt(1);

                await supabase
                    .channel(channelId)
                    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_count', filter: 'ch=eq.' + channelId }, handleInserts)
                    .subscribe();
            }
        };
        run();
    }

    const handleInserts = (payload) => {
        const { new: { ch, count } } = payload;

        if (ch === player.url.trim().replaceAll('https://', '').replaceAll('http://', '').replace('/api/stream?', '').replace('radio.yuntae.in', '')) {
            console.log(payload);
            setUserCnt(count);
        }
    };


    const disconnectFromRealtimeServer = async () => {
        await supabase.channel(prevChannelId).unsubscribe();
        await supabase.removeAllChannels();

        const { data, error } = await supabase
            .from('user_count')
            .select('ch, count')
            .eq('ch', prevChannelId);

        if (data.length > 0) {
            await supabase
                .from('user_count')
                .update({ count: data[0].count - 1 })
                .eq('ch', prevChannelId);
        }
        console.log("disconnect", prevChannelId)
    }


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
                replay();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    function replay() {
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
                        artist: '라디오 스트리밍 중',
                        artwork: [{
                            src: "/albumart.png",
                            sizes: "500x500",
                            type: "image/png",
                        }]
                    });
                }
            }

            return () => {
                hls.destroy();
            };
        }
    }

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
            bodyStyle={{ backgroundColor: 'var(--nav-background-color)', borderRadius: '20px 20px 0 0' }}
            style={!isMobile ? ({ backgroundColor: 'var(--nav-background-color)', borderRadius: '20px', bottom: '0', left: '74dvw', width: '25dvw', boxShadow: 'none' }) : (isOpen ? { backgroundColor: 'var(--nav-background-color)', borderRadius: '20px', bottom: '0', boxShadow: 'none' }
                : { backgroundColor: 'var(--nav-background-color)', borderRadius: '20px', bottom: '60px', boxShadow: 'none' })
            }
            overlay={isMobile}
            overflowHeight={isOpen ? 0 : 60}>

            <md-ripple></md-ripple>
            <div style={{ height: '95dvh' }}>
                {isOpen && !isSidebar.current &&
                    <div className='bottom-sheet-handle'></div>}

                {isOpen && isSidebar.current && <div className='sidebar-player-handle' onClick={() => setIsOpen(false)}>
                    <IonIcon name='chevron-down' />
                </div>}
                <div className={isOpen ? 'player-header open' : 'player-header'}>
                    <div className={isOpen ? 'player-header-title open' : 'player-header-title'} onClick={() => setIsOpen(true)}>
                        {player && (!isOpen ? player.title : '지금 재생 중')}
                        {player == [] && '재생 중인 스테이션 없음'}
                    </div>
                    {isOpen && userCnt > 0 &&
                        <div title={`${userCnt}명이 함께 듣는중`} className='player-header-title open' style={{ textAlign: 'right', fontSize: '1rem', opacity: '0.8' }}>
                            <IonIcon name='people' /> {userCnt}
                        </div>
                    }

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
                                {isNative.current && <div className={'player-heart-btn'} onClick={() => setIsOpenTimerModal(true)}>
                                    <IonIcon name='moon-outline' />
                                </div>}

                            </div>

                        </div>

                    </div>
                }

                {isOpen && isPlaying && <div className={isPlayerAnimation == 'true' || !isMobile ? 'circles active' : 'circles'}>
                    <div className="circle research"></div>
                    <div className="circle design"></div>
                </div>}

                <video autoPlay style={{ display: 'none' }}
                    ref={videoRef} />
            </div>

        </SwipeableBottomSheet>}



        {isOpenTimerModal &&
            <>
                <div className='timer-modal-backdrop' onClick={() => setIsOpenTimerModal(false)} />
                <TimerModal closeModal={() => setIsOpenTimerModal(false)} />
            </>
        }


        {!isOpen && <BottomNav />}
        {!isMobile && <BottomNav />}

    </>
    );
});

export default HlsPlayer;
