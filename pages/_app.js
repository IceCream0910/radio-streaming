import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import HlsPlayer from './components/player';
import { useState, useRef, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  const [currentPlayerData, setCurrentPlayerData] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    window.playerRef = playerRef;
  }, []);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <HlsPlayer ref={playerRef} />
      <Toaster />
    </RecoilRoot>
  )
}
