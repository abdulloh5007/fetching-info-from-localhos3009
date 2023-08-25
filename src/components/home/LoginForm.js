import { useState, useCallback } from 'react';
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

const LoginForm = () => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { userData, setUserData } = useUserContext(); // Получение функции для обновления данных пользователя
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage('');
        console.log(id);
        if (id != '') {
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
                            value: "#0d47a1",
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
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
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
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "square",
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
                    <Box sx={{ mt: '20px', display: 'flex', alignItems: 'center' }}>
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

                    {/* {id == '' ?
                        <Alert variant="outlined" sx={{ mt: '10px' }} severity="error">
                            Fill the inputs
                        </Alert>
                        :
                        ''
                    } */}

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
