"use client"
import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head';
import toast from 'react-hot-toast';

const Settings = () => {
    // const {  } = useGlobalState();

    /* pwa 대응 */
    let installPrompt = null;

    useEffect(() => {
        if (!window) return;
        window.addEventListener("beforeinstallprompt", async (event) => {
            const relatedApps = await navigator.getInstalledRelatedApps();

            // Search for a specific installed platform-specific app
            const psApp = relatedApps.find((app) => app.id === "com.icecream.sungilmeal");

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

    return (
        <>
            <Head>
                <title>설정</title>
            </Head>
            <main>
                <header>
                    <h2 style={{ width: '100%', textAlign: 'left', marginTop: '10px', marginLeft: '13px' }}>설정</h2>
                </header>
                <div style={{ height: '60px' }} />

                <h3 style={{ marginLeft: '10px' }}>앱 설치</h3>
                <button>안드로이드 앱 설치</button>
                <button onClick={() => installPWA()}>웹앱 설치</button>

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
