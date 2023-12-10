import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RegionStationList from './components/regionStationList';

const IndexPage = () => {
  const [region, setRegion] = useState('seoul');

  useEffect(() => {
    if (!document.querySelector(".adfit1")?.querySelector("ins")) {
      const ins = document.createElement("ins");
      const scr = document.createElement("script");
      ins.className = "kakao_ad_area";
      ins.style.display = "none";
      ins.style.width = "100%";
      scr.async = true;
      scr.type = "text/javascript";
      scr.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
      ins.setAttribute("data-ad-width", "320");
      ins.setAttribute("data-ad-height", "50");
      ins.setAttribute("data-ad-unit", "DAN-obadITFjOoIwJTz4");
      document.querySelector(".adfit1")?.appendChild(ins);
      document.querySelector(".adfit1")?.appendChild(scr);
    }

    if (!document.querySelector(".adfit2")?.querySelector("ins")) {
      const ins = document.createElement("ins");
      const scr = document.createElement("script");
      ins.className = "kakao_ad_area";
      ins.style.display = "none";
      ins.style.width = "100%";
      scr.async = true;
      scr.type = "text/javascript";
      scr.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
      ins.setAttribute("data-ad-width", "320");
      ins.setAttribute("data-ad-height", "100");
      ins.setAttribute("data-ad-unit", "DAN-kPFNlJNlrF6294zP");
      document.querySelector(".adfit2")?.appendChild(ins);
      document.querySelector(".adfit2")?.appendChild(scr);
    }
  }, []);

  const handleRegionChange = (event) => {
    setRegion(event.target.id);
    const regionSelect = document.querySelector('.region-select');
    const selectedButton = event.target;
    const scrollAmount = selectedButton.offsetLeft - (regionSelect.offsetWidth / 2) + (selectedButton.offsetWidth / 2) + 50;
    regionSelect.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <div>
      <Head>
        <title>스테이션</title>
      </Head>

      <main>
        <header>
          <h2 style={{ width: '100%', textAlign: 'left', marginTop: '10px', marginLeft: '13px' }}>스테이션</h2>
          <div className="region-select">
            <button id="seoul" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'seoul' ? 'active' : ''}>수도권</button>
            <button id="busan" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'busan' ? 'active' : ''}>부산·울산·경남</button>
            <button id="daegu" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'daegu' ? 'active' : ''}>대구·경북</button>
            <button id="gwangju" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'gwangju' ? 'active' : ''}>광주·전남</button>
            <button id="jeonbuk" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'jeonbuk' ? 'active' : ''}>전북</button>
            <button id="daejeon" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'daejeon' ? 'active' : ''}>대전·세종·충남</button>
            <button id="chungbuk" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'chungbuk' ? 'active' : ''}>충북</button>
            <button id="gangwon" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'gangwon' ? 'active' : ''}>강원</button>
            <button id="jeju" onClick={handleRegionChange} style={{ marginRight: '10px' }} className={region === 'jeju' ? 'active' : ''}>제주</button>
            <button>&nbsp;&nbsp;&nbsp;&nbsp;</button>
          </div>
        </header>


        <div style={{ height: '100px' }} />
        <div className="adfit1" />
        <RegionStationList region={region} />

        <div className="adfit2" />
      </main>
    </div>
  );
};

export default IndexPage;
