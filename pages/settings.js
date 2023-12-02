"use client"
import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head';

const Settings = () => {
    // const {  } = useGlobalState();


    return (
        <>
            <Head>
                <title>설정</title>
            </Head>
            <main>
                <header>
                    <h2 style={{ width: '100%', textAlign: 'left', marginTop: '10px', marginLeft: '13px' }}>설정</h2>
                </header>
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
