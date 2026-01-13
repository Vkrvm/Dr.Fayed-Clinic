'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Briefcase, LogOut, User, Users, Settings } from 'lucide-react';
import styles from './DashboardNav.module.scss';

interface DashboardNavProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
}

export default function DashboardNav({ user }: DashboardNavProps) {
    const pathname = usePathname();

    const navItems = [
        { href: '/en/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/en/dashboard/services', label: 'Services', icon: Briefcase },
        { href: '/en/dashboard/users', label: 'Users', icon: Users },
        { href: '/en/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <nav className={styles.sidebar}>
            <div className={styles.logo}>
                <h2>Fayed Admin</h2>
            </div>

            <div className={styles.user}>
                <User size={20} />
                <div>
                    <p className={styles.userName}>{user.name || 'Admin'}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                </div>
            </div>

            <ul className={styles.navList}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <button
                onClick={() => signOut({ callbackUrl: '/en/auth/signin' })}
                className={styles.logoutBtn}
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </nav>
    );
}
