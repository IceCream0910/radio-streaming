import React, { useState } from 'react';
import Head from 'next/head';
import IonIcon from '@reacticons/ionicons';

const NoticeData = [
    {
        question: 'v1.0.0 서비스 오픈 안내',
        date: '2023.12.11',
        answer: `안녕하세요. 개발자입니다.<br/>
        세상의 모든 라디오를 하나로 모은 라디오 앱을 <b>웹, 안드로이드, 네이버 웨일 확장앱</b> 버전으로 출시하였습니다.<br/>
        사용 중 불편한 점이나 문의 사항이 있으시면 언제든 <a href='mailto:hey@yuntae.in?subject=[라디오 앱 문의]' style="text-decoration:underline">문의</a>해주시기 바랍니다.<br/>
        앞으로 더 나은 서비스를 제공하기 위해 노력하겠습니다. 감사합니다.
        `,
    }
    // Add more FAQ items as needed
];
// ... (previous imports and component definition)

const Settings = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
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

                <section style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {NoticeData.map((item, index) => (
                        <div key={index} className="faq-item">
                            <div className="question" onClick={() => handleToggle(index)}>
                                {item.question}
                                <div style={{ fontSize: '14px', color: '#999999', fontWeight: 'normal', marginTop: '5px' }}>{item.date}</div>
                            </div>
                            {openIndex === index && <div className="answer" dangerouslySetInnerHTML={{ __html: item.answer }}></div>}
                        </div>
                    ))}
                </section>
            </main>

            <style jsx>{`
          main {
            display: flex;
            width: 100%;
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
            max-height: ${openIndex !== null ? '200px' : '0'};
            overflow: hidden;
            transition: all 0.2s ease-in-out;
            /* Use global for dynamic styles */
            :global(.faq-item:hover) .answer {
              max-height: 200px;
            }
          }

          .question:active {
            transform: scale(0.98);
          }
        `}</style>
        </>
    );
};

export default Settings;
