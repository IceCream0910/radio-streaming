import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import HlsPlayer from './components/player';
import { useState, useRef, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  const [currentPlayerData, setCurrentPlayerData] = useState(null);
  const playerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.playerRef = playerRef;
  }, []);


  return (
    <RecoilRoot>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-GXVJBMKYYZ`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GXVJBMKYYZ', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
      <HlsPlayer ref={playerRef} />
      <Toaster />
    </RecoilRoot>
  )
}
