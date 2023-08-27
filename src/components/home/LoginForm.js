import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../Context/context';
import style from '../../styles/login.module.scss'
import TextField from '@mui/material/TextField';

import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim";
import { Button, CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'


const LoginForm = () => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { userData, setUserData } = useUserContext(); // Получение функции для обновления данных пользователя
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        async function test() {
            const savedLoginId = window.sessionStorage.getItem('loginId');
            if (savedLoginId) {
                const response = await fetch(`http://localhost:3009/api/data/${savedLoginId}`);
                const data = await response.json();
                if (data == null) {
                    setErrorMessage('ID not found');
                } else {
                    setUserData(data); // Установка данных пользователя в контекст
                    setId(savedLoginId);
                    setRememberMe(true);
                    router.push(`/auth/${savedLoginId}`);
                }
            }
        }
        test()
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage('');
        if (id != '') {
            try {
                const response = await fetch(`http://localhost:3009/api/data/${id}`);
                const data = await response.json();

                if (data == null) {
                    setErrorMessage('ID not found');
                } else {
                    setUserData(data); // Установка данных пользователя в контекст
                    if (rememberMe) {
                        window.sessionStorage.setItem('loginId', data.id);
                    }
                    router.push(`/auth/${id}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        else {
            setLoading(false);
        }
    };

    const particlesInit = useCallback(async engine => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);
    return (
        <div className={style.loginContainer}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                style={{ zIndex: -11 }}
                options={{
                    background: {
                        color: {
                            value: "#A1A1A1",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "bubble",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 3,
                            },
                            bubble: {
                                distance: 200,
                                duration: 2,
                                opacity: 0.4,
                                size: 30,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#C6C6C6",
                            distance: 150,
                            enable: true,
                            opacity: 0.3,
                            width: 2,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 4,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 2, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
            <div className={style.login}>
                <div className={style.form}>
                    <Box sx={{ mt: '20px', display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField disabled={loading} onChange={(e) => {
                            setId(e.target.value)
                        }} id="input-with-sx" label="ID" variant="standard" />
                    </Box>
                    {/*  */}
                    <Box sx={{ mt: '30px', display: 'flex', alignItems: 'center' }}>
                        <LockIcon sx={{ color: 'action.active', mr: 1, mt: 1.5 }} />
                        <FormControl sx={{ width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end" sx={{ mb: 3 }}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>

                    {errorMessage && <Alert variant="outlined" sx={{ mt: '10px' }} severity="error">
                        {errorMessage}
                    </Alert>}

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        }
                        label="Запомнить меня"
                    />

                    {loading ?
                        <CircularProgress sx={{ mt: '20px' }} />
                        :
                        <Button onClick={handleLogin} variant="contained" size="medium">
                            Log In
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
