import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import IonIcon from '@reacticons/ionicons'
import BottomNav from './bottomNav';

const HlsPlayer = ({ data }) => {
    const videoRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (Hls.isSupported() && data) {
            const video = videoRef.current;
            const hls = new Hls();

            hls.loadSource(data.url);
            hls.attachMedia(video);

            video.addEventListener('canplaythrough', () => {
                video.play();
                setIsPlaying(true);
            });

            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: data.title || '제목없음',
                    artist: '라디오'
                });
            }

            return () => {
                hls.destroy();
            };
        }
    }, [data]);

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
            <div style={{ height: '90dvh' }}>
                <div className='player-header'>
                    <div className='player-header-title' onClick={() => setIsOpen(true)}>
                        {data && (!isOpen ? data.title : '지금 재생 중')}
                        {!data && '재생 중인 스테이션 없음'}
                    </div>
                    {!isOpen &&
                        <div className='player-header-close' onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <IonIcon name='pause' /> : <IonIcon name='play' />}
                        </div>
                    }
                </div>

                {data &&
                    <div className='player-body'>
                        <div className='player-body-title'>
                            {data && data.title}
                        </div>
                        <div className='player-playpause-btn' onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <IonIcon name='pause-circle' /> : <IonIcon name='play-circle' />}
                        </div>

                    </div>
                }


                <video autoPlay style={{ display: 'none' }}
                    ref={videoRef} />
            </div>
        </SwipeableBottomSheet>}



        {!isOpen && <BottomNav />}

    </>
    );
};

export default HlsPlayer;
