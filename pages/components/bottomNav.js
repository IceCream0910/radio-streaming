import React from 'react';
import IonIcon from '@reacticons/ionicons'
import Link from 'next/link';
import { useRouter } from 'next/router';
function BottomNav() {
    const router = useRouter();

    return (
        <div className="bottom-nav">
            <Link href='/' className={router.pathname === '/' ? 'item active' : 'item'}><IonIcon name={router.pathname == '/' ? "radio" : "radio-outline"} /></Link>
            <Link href='/favorites' className={router.pathname === '/favorites' ? 'item active' : 'item'}><IonIcon name={router.pathname == '/favorites' ? "heart" : "heart-outline"} /></Link>
            <Link href='/settings' className={router.pathname.indexOf('/settings') > -1 ? 'item active' : 'item'}><IonIcon name={router.pathname.indexOf('/settings') > -1 ? "settings" : "settings-outline"} /></Link>
        </div>
    );
}

export default BottomNav;