import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserContext } from '../Context/context';

const LoginForm = () => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { setUserData } = useUserContext(); // Получение функции для обновления данных пользователя

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`http://localhost:3009/api/data/${id}`);
            const data = await response.json();

            if (data == null) {
                setErrorMessage('ID not found');
            } else {
                setUserData(data); // Установка данных пользователя в контекст
                router.push(`/${id}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <input
                type="text"
                placeholder="ID"
                className="inp"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button className="search" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
};

export default LoginForm;
