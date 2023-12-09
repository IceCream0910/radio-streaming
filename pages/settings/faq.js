import React, { useState } from 'react';
import Head from 'next/head';
import IonIcon from '@reacticons/ionicons';

const FAQData = [
    {
        question: 'Q. 종료 타이머는 어떤 기능인가요?',
        answer: `종료 타이머를 이용하면 설정한 시간이 흐른 후에 자동으로 앱이 종료되도록 설정할 수 있습니다.<br/>
        자기 전 라디오를 재생하고 타이머를 설정해 두면, 잠들기 전에 앱을 종료하지 않아도 자동으로 종료되도록 할 수 있습니다.`,
    },
    {
        question: 'Q. 안드로이드 앱과 웹앱의 차이가 무엇인가요?',
        answer: '안드로이드 앱을 이용하면 보다 <b>안정적인 백그라운드 재생과 종료 타이머 기능, 화면 꺼짐 방지 옵션</b> 등을 이용할 수 있습니다.<br/>웹앱은 브라우저에서 동작하는 앱으로 대부분의 기능이 동작하지만 일부 기능은 지원하지 않습니다.<br/>iOS와 같이 안드로이드 앱 설치가 불가능한 환경에서는 웹앱으로 이용해주시기 바랍니다.',
    },
    {
        question: 'Q. 현재 프로그램명과 선곡 정보가 표시되지 않는 스테이션이 있어요.',
        answer: `현재 일부 스테이션에서만 방송 중인 프로그램명과 플레이되고 있는 곡 정보를 표시하고 있습니다.<br/><br/>
        KBS : 모든 지역 프로그램명 제공<br/>
        MBC : 수도권 지역 프로그램명 및 선곡 정보 제공<br/>
        SBS : 수도권 지역 프로그램명 제공<br/><br/>
        향후 모든 지역과 스테이션에서 다양한 정보를 제공할 수 있도록 노력하겠습니다.`,
    },
    {
        question: 'Q. 인터넷 연결 없이 사용할 수 있나요?',
        answer: `이 앱은 인터넷을 통해 스트리밍 방식으로 라디오를 재생합니다.<br/>따라서 서비스 이용을 위해서는 네트워크 연결이 필요합니다.`,
    },
];

const Settings = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <>
            <Head>
                <title>자주하는 질문</title>
            </Head>
            <main className="settings">
                <header style={{ display: 'flex', alignItems: 'center', paddingLeft: '30px' }}>
                    <span onClick={() => window.history.back()} style={{ fontSize: '1.5rem' }}>
                        <IonIcon name="arrow-back-outline" style={{ position: 'relative', top: '4px' }} />
                    </span>
                    <h2 style={{ width: '100%', textAlign: 'left', marginTop: '10px', marginLeft: '13px' }}>자주하는 질문</h2>
                </header>
                <div style={{ height: '60px' }} />

                <section style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {FAQData.map((item, index) => (
                        <div key={index} className="faq-item">
                            <div className="question" onClick={() => handleToggle(index)}>
                                {item.question}
                            </div>
                            {openIndex === index && <div className="answer" dangerouslySetInnerHTML={{ __html: item.answer }}></div>}
                        </div>
                    ))}

                    <br />
                    <a href='mailto:hey@yuntae.in?subject=[라디오 앱 문의] ' style={{ textDecoration: 'underline' }}><div className='station-item'>아직 궁금한 점이 있나요?</div></a>

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
