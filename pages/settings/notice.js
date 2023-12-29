import React, { useState } from 'react';
import Head from 'next/head';
import IonIcon from '@reacticons/ionicons';

const NoticeData = [
  {
    question: '23년 12월 업데이트 내역',
    date: '2023.12.30',
    answer: `
        <h3>23.12.30</h3><br/>
        - <span style="opacity: 0.7">(웹/웨일 확장앱)</span> 일시정지 후 다시 재생했을 때, 일시정지 시점이 아닌 실시간 스트리밍 위치로 이동하도록 개선했어요.<br/>
        - <span style="opacity: 0.7">(Beta) </span>스테이션 별로 현재 청취중인 사용자 수를 실시간으로 표시해줄게요.<br/>
        <br/><br/>
        <h3>23.12.26</h3><br/>
        - PC/태블릿에 맞게 반응형 레이아웃을 적용했어요.<br/><br/>
        `,
  },
  {
    question: '서비스 오픈 안내',
    date: '2023.12.11',
    answer: `안녕하세요 :)<br/>
        세상의 모든 라디오를 하나로 모은 라디오 앱을 <b>웹, 안드로이드, 네이버 웨일 확장앱</b> 버전으로 출시하였습니다.<br/><br/>
        <a href='https://store.whale.naver.com/detail/mebmjdmdebnhodookpfemachpamkjlkl' target="_blank" style="text-decoration:underline">웨일 확장앱 설치하기</a><br/>
        <a href='https://play.google.com/store/apps/details?id=com.icecream.simplemediaplayer' target="_blank" style="text-decoration:underline">안드로이드 앱 설치하기</a>
        <br/><br/>
        사용 중 불편한 점이나 문의 사항이 있으시면 언제든 <a href='mailto:hey@yuntae.in?subject=[라디오 앱 문의]' style="text-decoration:underline">문의</a>해주시기 바랍니다.<br/>
        앞으로 더 나은 서비스를 제공하기 위해 노력하겠습니다. 감사합니다.
        `,
  }
];

const Settings = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(index);
  };

  return (
    <>
      <Head>
        <title>공지사항</title>
      </Head>
      <main className="settings">
        <header style={{ display: 'flex', alignItems: 'center', paddingLeft: '30px' }}>
          <span onClick={() => window.history.back()} style={{ fontSize: '1.5rem' }}>
            <IonIcon name="arrow-back-outline" style={{ position: 'relative', top: '4px' }} />
          </span>
          <h2 style={{ width: '100%', textAlign: 'left', marginTop: '10px', marginLeft: '13px' }}>공지사항</h2>
        </header>
        <div style={{ height: '60px' }} />

        <section style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: openIndex != null ? '0px' : '0' }}>
          {NoticeData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="question" onClick={() => handleToggle(index)}>
                {item.question}
                <div style={{ fontSize: '14px', color: '#999999', fontWeight: 'normal', marginTop: '5px' }}>{item.date}</div>
              </div>
              {openIndex === index && <div className="answer" dangerouslySetInnerHTML={{ __html: item.answer }}></div>}
            </div>
          ))}
          <br /><br /><br /><br /><br /><br /><br />
        </section>
      </main>

      <style jsx>{`
          main {
            display: flex;
            height: 100vh;
            flex-direction: column;
            gap: 15px;
            padding: 20px;
          }
  
          .faq-item {
            border-radius: 15px;
            overflow: hidden;
          }
  
          .question {
            padding: 15px;
            background-color: #1f1f1f;
            cursor: pointer;
            border-radius: 15px;
            transition: all 0.2s ease-in-out;
          }
  
          .answer {
            padding: 15px;
            background-color: #000;
            overflow: hidden;
            transition: all 0.2s ease-in-out;
          }

          .question:active {
            transform: scale(0.98);
          }
        `}</style>
    </>
  );
};

export default Settings;
