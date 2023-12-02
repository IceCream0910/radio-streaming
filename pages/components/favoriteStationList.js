import IonIcon from '@reacticons/ionicons';
import { useRecoilState } from 'recoil';
import { playerData, favoritesData } from '../../states/states';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function FavoriteStationList() {
    const radioData = require('/public/radioStations.json');
    const [player, setPlayer] = useRecoilState(playerData);
    const [favorites, setFavorites] = useRecoilState(favoritesData);
    const [actualFavorites, setActualFavorites] = useState([])

    const toggleFavorites = (title) => {
        if (favorites.includes(title)) {
            setFavorites(favorites.filter(favorite => favorite !== title));
            toast.dismiss();
            toast('자주 듣는 목록에서 제거했어요.', {
                icon: '🗑️',
                duration: 2500,
                position: 'bottom-center',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: '120px'
                }
            });
        } else {
            setFavorites([...favorites, title]);
        }
    }

    useEffect(() => {
        console.log("fav:", favorites);
        setActualFavorites(favorites);
    }, [favorites]);


    return (<>
        <Toaster />
        {actualFavorites.length === 0 ? (
            <p style={{ opacity: .8, textAlign: 'center', marginTop: '5em' }}>
                자주 듣는 스테이션이 하나도 없네요.<br />
                스테이션 옆 <IonIcon name='heart-outline' /> 버튼을 눌러 추가해보세요.
            </p>
        ) : (
            radioData.filter(radio => actualFavorites.includes(radio.title)).map((radio, index) => (
                <div className='station-item' key={index}>
                    <span style={{ width: '90%' }} onClick={() => setPlayer(radio)}>{radio.title}</span>
                    <button onClick={() => toggleFavorites(radio.title)}>
                        {actualFavorites.includes(radio.title) ? <IonIcon name='heart' /> : <IonIcon name='heart-outline' />}
                    </button>
                </div>
            ))
        )}

    </>)
}