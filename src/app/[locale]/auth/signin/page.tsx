'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignIn.module.scss';

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
                setLoading(false);
            } else {
                router.push('/en/dashboard');
                router.refresh();
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Admin Login</h1>
                    <p>Sign in to manage your clinic</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="admin@fayedclinic.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className={styles.demoCredentials}>
                        <p><strong>Demo Credentials:</strong></p>
                        <p>Email: admin@fayedclinic.com</p>
                        <p>Password: Admin123!</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
