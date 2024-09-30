import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import HlsPlayer from './components/player';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [currentPlayerData, setCurrentPlayerData] = useState(null);
  const playerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState(typeof window !== 'undefined' && window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'system'); // ['system', 'light', 'dark'
  const [fontSize, setFontSize] = useState(typeof window !== 'undefined' && window.localStorage.getItem('fontSize') ? parseInt(window.localStorage.getItem('fontSize')) : 0); // [0, 1, 2, 3]

  function test() {
    console.log('test');
  }

  useEffect(() => {
    window.playerRef = playerRef;
    window.test = test;

    const initialPage = localStorage.getItem('initialPage') || 'station';
    if (router.pathname === '/' && initialPage === 'favorites') {
      router.push('/favorites');
    }
  }, []);

  useEffect(() => {
    if (theme == 'light') {
      const root = document.documentElement;
      root.style.setProperty('--background-color', '#eee');
      root.style.setProperty('--foreground-color', '#000');
      root.style.setProperty('--button-background-color', '#0000001f');
      root.style.setProperty('--button-foreground-color', '#000');
      root.style.setProperty('--nav-background-color', '#fff');
      root.style.setProperty('--nav-foreground-color', '#000');
      root.style.setProperty('--accent-color', '#2ad795');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    switch (fontSize) {
      case 0:
        root.style.setProperty('--title-font-size', '1.6rem');
        root.style.setProperty('--subtitle-font-size', '1.2rem');
        root.style.setProperty('--button-font-size', '1.3rem');
        root.style.setProperty('--content-font-size', '1rem');
        root.style.setProperty('--main-header-bottom-margin', '100px');
        root.style.setProperty('--header-bottom-margin', '60px');
        break;
      case 1:
        root.style.setProperty('--title-font-size', '1.8rem');
        root.style.setProperty('--subtitle-font-size', '1.5rem');
        root.style.setProperty('--button-font-size', '1.5rem');
        root.style.setProperty('--content-font-size', '1.3rem');
        root.style.setProperty('--main-header-bottom-margin', '110px');
        root.style.setProperty('--header-bottom-margin', '70px');
        break;
      case 2:
        root.style.setProperty('--title-font-size', '2.2rem');
        root.style.setProperty('--subtitle-font-size', '1.9rem');
        root.style.setProperty('--button-font-size', '1.9rem');
        root.style.setProperty('--content-font-size', '1.7rem');
        root.style.setProperty('--main-header-bottom-margin', '120px');
        root.style.setProperty('--header-bottom-margin', '80px');
        break;
    }
  }, [fontSize]);


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
