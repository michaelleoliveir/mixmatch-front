import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [icon, setIcon] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // validar o usuário e verificar se o token é válido, para pegar seus dados
    const validateSession = useCallback((token: string) => {
        setAuthError(null);
        setIsAuthLoading(true);

        fetch(import.meta.env.VITE_BACKEND_API + '/validate-session', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                setIsAuthLoading(false);
                return res.json();  
            }
        }).then((data) => {
            setUser(data.user);
            setIcon(data.icon);
        }).catch(() => {
            sessionStorage.removeItem('spotify_token');
            sessionStorage.setItem('auth_error', 'true');
            window.location.href = '/error'
        }).finally(() => {
            setIsAuthLoading(false); 
        });
    }, []);

    // verificar se há um token permitindo o usuário a entrar na página inicial
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        const storedToken = sessionStorage.getItem('spotify_token');

        if (urlToken) {
            sessionStorage.setItem('spotify_token', urlToken);
            window.history.replaceState({}, '', '/dashboard');
            validateSession(urlToken);
        } else if (storedToken) {
            validateSession(storedToken);
        } else {
            sessionStorage.setItem('auth_error', 'true');
            window.location.href = '/';
        }
    }, [validateSession]);

    // desconectar do sistema
    const handleLogout = async () => {
        const token = sessionStorage.getItem('spotify_token');

        try {
            await fetch(import.meta.env.VITE_BACKEND_API + '/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
        } catch (error) {
            setAuthError(error);
        } finally {
            sessionStorage.removeItem('spotify_token');
            window.location.href = '/';
        }
    };

    return { user, icon, authError, validateSession, handleLogout, isAuthLoading };
}