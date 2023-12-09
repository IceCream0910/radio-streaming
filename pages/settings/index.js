"use client"
import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head';
import toast from 'react-hot-toast';
import '@material/web/switch/switch.js';
import IonIcon from '@reacticons/ionicons';
import Link from 'next/link';

const Settings = () => {
    // const {  } = useGlobalState();
    const [isNative, setIsNative] = useState(false);
    let installPrompt = null;

    const [preventScreenOff, setPreventScreenOff] = useState(typeof window !== 'undefined' && window.localStorage.getItem('preventScreenOff') ? window.localStorage.getItem('preventScreenOff') === 'true' : 'false');

    useEffect(() => {
        const useragent = navigator.userAgent;
        setIsNative(useragent.indexOf('AndroidNative') > -1)
    }, []);

    useEffect(() => {
        if (!window) return;
        window.addEventListener("beforeinstallprompt", async (event) => {
            const relatedApps = await navigator.getInstalledRelatedApps();

            // Search for a specific installed platform-specific app
            const psApp = relatedApps.find((app) => app.id === "com.icecream.simplemediaplayer");

            if (psApp) {
                event.preventDefault();
                toast('이미 안드로이드 앱이 설치되어 있습니다.');
            } else {
                installPrompt = event;
            }
        });

        window.addEventListener("appinstalled", () => {
            disableInAppInstallPrompt();
        });
    }, []);

    function disableInAppInstallPrompt() {
        installPrompt = null;
    }

    async function installPWA() {
        if (!installPrompt) {
            toast.dismiss()
            toast('이미 웹앱이 설치되어 있어요', {
                duration: 2000,
                position: 'bottom-center',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: '120px'
                }
            });
            return;
        }
        const result = await installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
        disableInAppInstallPrompt();
    }

    const togglePreventScreenOff = () => {
        if (preventScreenOff == true) {
            setPreventScreenOff(false);
        } else {
            setPreventScreenOff(true);
        }
        toast.dismiss()
        toast('앱을 재시작하면 설정이 적용됩니다', {
            duration: 2000,
            position: 'bottom-center',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                width: '100%',
                textAlign: 'left',
                marginBottom: '120px'
            }
        });
    }

    useEffect(() => {
        localStorage.setItem('preventScreenOff', preventScreenOff);
        if (isNative) {
            Native.updateSetting('settings_prevent_screen_off', preventScreenOff);
        }
    }, [preventScreenOff]);

    return (
        <>
            <Head>
                <title>설정</title>
            </Head>
            <main className='settings'>
                <header>
                    <h2 style={{ width: '100%', textAlign: 'left', marginTop: '10px', marginLeft: '13px' }}>설정</h2>
                </header>
                <div style={{ height: '60px' }} />

                <section style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {isNative && <>
                        <label style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                            앱 실행 중 화면 꺼짐 방지
                            <md-switch {...(preventScreenOff == true ? { selected: true } : {})} onClick={togglePreventScreenOff}></md-switch>
                        </label>
                        <br /></>}

                    {!isNative && <>
                        <h3>앱 설치</h3>
                        <div className='station-item'>안드로이드 앱 설치<IonIcon name='arrow-forward-outline' /></div>
                        <div className='station-item' onClick={() => installPWA()}>웹 앱으로 설치<IonIcon name='arrow-forward-outline' /></div>
                        <br /></>}

                    <h3>링크</h3>
                    <a href='mailto:hey@yuntae.in?subject=[라디오 앱 문의] '><div className='station-item'>문의/스테이션 추가 요청<IonIcon name='arrow-forward-outline' /></div></a>
                    <Link href={'/settings/faq'}><div className='station-item'>자주하는 질문<IonIcon name='arrow-forward-outline' /></div></Link>
                    <Link href={'/settings/notice'}><div className='station-item'>공지사항<IonIcon name='arrow-forward-outline' /></div></Link>

                    <br />
                    <h3 >정보</h3>
                    <h5>1.0.0 ver.</h5>
                    <h5>© Yun Tae In</h5>
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
        `}</style>

        </>
    )
};

export default Settings;
