'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Key, UserPlus } from 'lucide-react';
import { getUsers, createUser, deleteUser, toggleUserActive, changePassword, seedDefaultAdmin } from '@/lib/actions/users';
import styles from './UsersPage.module.scss';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
}

export default function UsersManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState<string | null>(null);
    const [newUser, setNewUser] = useState({ email: '', password: '', name: '', role: 'admin' });
    const [newPassword, setNewPassword] = useState('');

    const loadUsers = async () => {
        setIsLoading(true);
        // Seed default admin if needed
        await seedDefaultAdmin();
        const data = await getUsers();
        setUsers(data as User[]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUser.email || !newUser.password || !newUser.name) {
            alert('Please fill all fields');
            return;
        }
        const result = await createUser(newUser);
        if (result.success) {
            setShowAddModal(false);
            setNewUser({ email: '', password: '', name: '', role: 'admin' });
            loadUsers();
        } else {
            alert(result.error);
        }
    };

    const handleDelete = async (id: string, email: string) => {
        if (confirm(`Are you sure you want to delete ${email}?`)) {
            const result = await deleteUser(id);
            if (result.success) {
                loadUsers();
            } else {
                alert(result.error);
            }
        }
    };

    const handleToggleActive = async (id: string) => {
        const result = await toggleUserActive(id);
        if (result.success) {
            loadUsers();
        } else {
            alert(result.error);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        if (showPasswordModal) {
            const result = await changePassword(showPasswordModal, newPassword);
            if (result.success) {
                setShowPasswordModal(null);
                setNewPassword('');
                alert('Password changed successfully');
            } else {
                alert(result.error);
            }
        }
    };

    if (isLoading) {
        return <div className={styles.container}>Loading users...</div>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>User Management</h1>
                        <p className={styles.subtitle}>Manage admin accounts</p>
                    </div>
                    <button onClick={() => setShowAddModal(true)} className={styles.addBtn}>
                        <UserPlus size={20} />
                        Add New User
                    </button>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={styles.roleBadge}>{user.role}</span>
                                    </td>
                                    <td>
                                        <button
                                            className={`${styles.statusBtn} ${user.isActive ? styles.active : styles.inactive}`}
                                            onClick={() => handleToggleActive(user.id)}
                                        >
                                            {user.isActive ? (
                                                <><ToggleRight size={18} /> Active</>
                                            ) : (
                                                <><ToggleLeft size={18} /> Inactive</>
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.passwordBtn}
                                                onClick={() => setShowPasswordModal(user.id)}
                                                title="Change Password"
                                            >
                                                <Key size={16} />
                                            </button>
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => handleDelete(user.id, user.email)}
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Add New User</h2>
                        <form onSubmit={handleAddUser}>
                            <div className={styles.formGroup}>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    placeholder="Min 6 characters"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Role</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super Admin</option>
                                </select>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowAddModal(false)} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className={styles.modalOverlay} onClick={() => setShowPasswordModal(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Change Password</h2>
                        <form onSubmit={handleChangePassword}>
                            <div className={styles.formGroup}>
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Min 6 characters"
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowPasswordModal(null)} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
