import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Hls from 'hls.js';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import IonIcon from '@reacticons/ionicons'
import BottomNav from './bottomNav';
import { useRecoilState } from 'recoil';
import { playerData } from '../../states/states';

const HlsPlayer = forwardRef((props, ref) => {
    const [player, setPlayer] = useRecoilState(playerData);

    const videoRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const isNative = useRef(null);

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
        console.log(player)
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

    return (<>

        {isReady && <SwipeableBottomSheet
            open={isOpen}
            onChange={(e) => setIsOpen(e)}
            topShadow={true}
            shadowTip={false}
            bodyStyle={{ backgroundColor: '#1f1f1f', borderRadius: '20px 20px 0 0' }}
            style={isOpen ? { backgroundColor: '#1f1f1f', borderRadius: '20px', bottom: '0' } : { backgroundColor: '#1f1f1f', borderRadius: '20px', bottom: '60px' }}
            overflowHeight={60}>
            <div style={{ height: '95dvh' }}>
                <div className='player-header'>
                    <div className='player-header-title' onClick={() => setIsOpen(true)}>
                        {player && (!isOpen ? player.title : '지금 재생 중')}
                        {player == [] && '재생 중인 스테이션 없음'}
                    </div>
                    {!isOpen && player &&
                        <div className='player-header-close' onClick={() => [setNativePlayerPlaying(isPlaying ? false : true), setIsPlaying(!isPlaying)]}>
                            {isPlaying ? <IonIcon name='pause' /> : <IonIcon name='play' />}
                        </div>
                    }
                </div>

                {player &&
                    <div className='player-body'>
                        <div className='player-body-title'>
                            {player && player.title}
                        </div>
                        <div className='player-playpause-btn' onClick={() => [setNativePlayerPlaying(isPlaying ? false : true), setIsPlaying(!isPlaying)]}>
                            {isPlaying ? <IonIcon name='pause-circle' /> : <IonIcon name='play-circle' />}
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
        </SwipeableBottomSheet>}



        {!isOpen && <BottomNav />}

    </>
    );
});

export default HlsPlayer;
