import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import IonIcon from '@reacticons/ionicons'
import BottomNav from './bottomNav';
import { useRecoilState } from 'recoil';
import { playerData } from '../../states/states';

const HlsPlayer = () => {
    const [player, setPlayer] = useRecoilState(playerData);

    const videoRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        console.log(player)
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
    }, [player]);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

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
                        <div className='player-header-close' onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <IonIcon name='pause' /> : <IonIcon name='play' />}
                        </div>
                    }
                </div>

                {player &&
                    <div className='player-body'>
                        <div className='player-body-title'>
                            {player && player.title}
                        </div>
                        <div className='player-playpause-btn' onClick={() => setIsPlaying(!isPlaying)}>
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
};

export default HlsPlayer;
