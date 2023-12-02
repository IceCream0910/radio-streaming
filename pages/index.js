import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RegionStationList from './components/regionStationList';
import HlsPlayer from './components/player';

const IndexPage = () => {
  const [region, setRegion] = useState('seoul');
  const [currentData, setCurrentData] = useState(null);

  const playAudio = (data) => {
    setCurrentData(data);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.id);
    const regionSelect = document.querySelector('.region-select');
    const selectedButton = event.target;
    const scrollAmount = selectedButton.offsetLeft - (regionSelect.offsetWidth / 2) + (selectedButton.offsetWidth / 2) + 50;
    regionSelect.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };


  return (
    <div>
      <Head>
        <title>radio</title>
      </Head>

      <main>
        <header>
          <h2 style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>스테이션</h2>
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
        <RegionStationList region={region} playFunc={playAudio} />
        <HlsPlayer data={currentData} />
      </main>
    </div>
  );
};

export default IndexPage;
