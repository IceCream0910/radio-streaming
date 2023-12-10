import React, { useState } from 'react';
import Head from 'next/head';
import IonIcon from '@reacticons/ionicons';


const Settings = () => {
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
                    <h2 style={{ width: '100%', textAlign: 'left', marginTop: '10px', marginLeft: '13px' }}>웹 앱 설치</h2>
                </header>
                <div style={{ height: '60px' }} />
                <br /><br />

                <section style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3>안드로이드</h3>
                    <p>
                        1. 크롬 브라우저에서 우측 상단 점 세 개 버튼을 클릭하세요.<br></br>
                        2. "앱 설치"를 클릭하세요.
                        <br></br><br></br>
                        또는 브라우저에서 표시되는 설치 팝업을 통해서도 설치가 가능합니다.
                    </p>
                    <img
                        src={
                            'https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/kRjcsxlHDZa9Nqg2Fpei.png?auto=format&w=1600'
                        }
                    />
                    <br></br>
                    <h3>iOS & iPadOS</h3>
                    <p>
                        1. Safari 브라우저에서 하단의 공유 버튼을 클릭하세요.<br></br>
                        2. "홈 화면에 추가"를 클릭하세요.
                    </p>
                    <img
                        src={
                            'https://www.cdc.gov/niosh/mining/UserFiles/content/hearingloss/images/pwa_ios.png'
                        }
                    />

                    <br></br>
                    <h3>PC</h3>
                    <p>
                        브라우저 상단 주소창에 표시되는 설치 아이콘이나 텍스트를 클릭하세요.
                    </p>
                    <img
                        src={
                            'https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/zIfRss5zOrZ49c4VdJ52.png?auto=format&w=1600'
                        }
                    />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
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
