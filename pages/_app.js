import '@/styles/globals.css'
import { RecoilRoot } from 'recoil';
import HlsPlayer from './components/player';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [currentPlayerData, setCurrentPlayerData] = useState(null);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <HlsPlayer />
    </RecoilRoot>
  )
}
