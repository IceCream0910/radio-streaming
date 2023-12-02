import React from 'react';
import IonIcon from '@reacticons/ionicons'
import Link from 'next/link';
import { useRouter } from 'next/router';
function BottomNav() {
    const router = useRouter();

    return (
        <div className="bottom-nav">
            <Link href='/' className={router.pathname === '/' ? 'item active' : 'item'}><IonIcon name={router.pathname == '/' ? "radio" : "radio-outline"} /></Link>
            <Link href='/' className={router.pathname === '/favorites' ? 'item active' : 'item'}><IonIcon name={router.pathname == '/favorites' ? "heart" : "heart-outline"} /></Link>
            <Link href='/' className={router.pathname === '/menu' ? 'item active' : 'item'}><IonIcon name={router.pathname == '/menu' ? "menu" : "menu-outline"} /></Link>
        </div>
    );
}

export default BottomNav;