import { useUserContext } from "@/components/Context/context";
import { Skeleton } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import style from '../../styles/profile.module.scss'

// dialog
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from "next/link";

import Alert from '@mui/material/Alert';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';
import WalletIcon from '@mui/icons-material/Wallet';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import BeenhereIcon from '@mui/icons-material/Beenhere';


const ProfilePage = () => {
    const router = useRouter();
    const { userData } = useUserContext();
    const [isLoading, setIsLoading] = useState(true);
    const [newNick, setNewNick] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isError, setIsError] = useState('');
    const [openBonus, setOpenBonus] = useState(false)
    const [bonusInfo, setBonusInfo] = useState('')

    useEffect(() => {
        if (!userData) {
            router.push('/login');
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }
    }, [userData]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // get bonus
    const handleClickOpenBonus = async () => {

        // Пример функции для генерации случайного типа бонуса (монеты или UC)
        function getRandomBonusType() {
            return Math.random() < 0.5 ? 'монеты' : 'UC';
        }

        // Пример функции для генерации случайной суммы
        function getRandomAmount() {
            return Math.floor(Math.random() * (10000 - 10) + 10); // Пример суммы от 10 до 10000
        }

        function getRandomUc() {
            return Math.floor(Math.random() * (10 - 1) + 1); // Пример суммы от 1 до 10
        }

        // Пример функции для форматирования оставшегося времени
        function formatRemainingTime(remainingTime) {
            const hours = Math.floor(remainingTime / (60 * 60 * 1000));
            const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
            const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

            return `${hours} ч ${minutes} мин ${seconds} сек`;
        }

        setOpenBonus(true);
        let bonusCooldown = 24 * 60 * 60 * 1000

        const lastBonusTime = userData.lastBonusTime || 0;
        const userStatusName = userData.status[0].statusName
        const currentTime = Date.now()

        // Изменяем cooldown для VIP и Premium пользователей
        if (userStatusName === 'vip' || userStatusName === 'premium') {
            bonusCooldown = 12 * 60 * 60 * 1000; // 12 часов в миллисекундах
        } else {
            bonusCooldown = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
        }


        if (currentTime - lastBonusTime >= bonusCooldown) {
            const bonusAmount = getRandomAmount();
            const bonusType = getRandomBonusType();
            const bonusUc = getRandomUc();
            const bonusTypeFormatted = bonusType === 'UC' ? 'UC' : '$';
            const donateX2 = bonusType === 'UC' ? bonusUc * 2 : bonusAmount * 2;

            let bonusMessage = `Вы получили свой ежедневный бонус:\n${bonusAmount} ${bonusTypeFormatted}.`;

            if (userStatusName === 'vip') {
                bonusMessage += `\n<b>${userStatusName.toUpperCase()} 💎</b> 2X = ${donateX2} ${bonusTypeFormatted}.`;
            } else if (userStatusName === 'premium') {
                bonusMessage += `\n<b>${userStatusName.toUpperCase()} ⭐️</b> 2X = ${donateX2} ${bonusTypeFormatted}.`;
            }

            // // Обновление информации о бонусе в базе данных
            // try {
            //     await fetch(`http://localhost:3009/api/updateBonus/${userData.id}`, {
            //         method: 'PUT',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ bonusType, bonusAmount })
            //     });
            // } catch (error) {
            //     console.error('Error updating bonus:', error);
            // }
            console.log(bonusMessage);
            setBonusInfo(bonusMessage);
            setOpenBonus(true);
        } else {
            const remainingTime = formatRemainingTime(bonusCooldown - (currentTime - lastBonusTime));
            const errorMessage = `Вы уже получили бонус. Вы сможете получить следующий бонус через ${remainingTime}.`;
            setBonusInfo(errorMessage);
            setOpenBonus(true);
        }
    };

    const handleCloseBonus = () => {
        setOpenBonus(false);
    };

    const handleUpdateNick = async () => {
        setIsUpdating(true);
        try {
            const userStatusName = userData.status[0].statusName;
            let minLength = 8;
            if (userStatusName === 'premium' || userStatusName === 'vip') {
                minLength = 16;
            }

            if (newNick.length < 3) {
                setIsError(<Alert severity="warning">Nickname must be at least 3 characters long</Alert>);
            } else if (newNick.length > minLength) {
                setIsError(<Alert severity="warning">The nick must have at least {minLength} length</Alert>);
            } else {
                const response = await fetch(`http://localhost:3009/api/updateNick/${userData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newNick: newNick })
                });

                if (response.ok) {
                    setIsError(<Alert severity="success">Nickname updated successfully update the site to see news</Alert>);
                } else {
                    console.error('Failed to update nickname');
                    setIsError(<Alert severity="error">Nickname updated successfully update the site to see news</Alert>);
                }
            }
        } catch (error) {
            console.error('Error updating nickname:', error);
        } finally {
            setIsUpdating(false);
            handleClose();
        }
    };

    return (
        <div className={style.profile}>
            <Head>
                <title>Profile Page</title>
            </Head>
            <div className={style.profile_data}>
                {isLoading ? (
                    <>
                        <b><Skeleton animation="wave" /></b>
                        <b><Skeleton animation="wave" /></b>
                        <b><Skeleton animation="wave" /></b>
                        <b><Skeleton animation="wave" /></b>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <b style={{ width: '60%' }}>NICK <PersonIcon />: {userData.userName}</b>
                            <Button onClick={handleClickOpen} sx={{ color: 'white' }}><EditIcon /></Button>
                        </div>
                        {isError}
                        <b>ID <FingerprintIcon />: {userData.id}</b>
                        <b>BALANCE <AttachMoneyIcon />: {userData.balance}</b>
                        <b>UC <WalletIcon />: {userData.uc}</b>
                        <b>STATUS <MilitaryTechIcon />: {userData.status[0].statusName.toUpperCase()}</b>
                        <b>Plastic card <CreditCardIcon />: {userData.bankCard[0].cardNumber}</b>
                        <b>Crypto currencies <ArrowDownwardIcon /></b>
                        <b style={{ marginLeft: '60px', width: '300px' }}>Altcoin IDX <AccountBalanceIcon />: {userData.crypto[0].altcoinidx}</b>
                        <br />
                        <b>Reg time <AccessTimeIcon />: {userData.registerTime}</b>
                        <br />
                        <br />
                        <div className={style.buttonGroup}>
                            <Button onClick={handleClickOpenBonus} variant="contained" startIcon={<BeenhereIcon />}>Get Bonus</Button>
                        </div>
                        <div className={style.buttonGroup}>
                            <Link onClick={() => window.sessionStorage.removeItem('loginId')} href='/login'><Button variant="contained" startIcon={<LogoutIcon />}>Log Out</Button></Link>
                        </div>

                        {/* DAILY BONUS DIALOG */}
                        <Dialog
                            open={openBonus}
                            onClose={handleCloseBonus}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Successfully got bonus"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Let Google help apps determine location. This means sending anonymous
                                    location data to Google, even when no apps are running.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseBonus} autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Update nick</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    New nick name
                                </DialogContentText>
                                <TextField
                                    disabled={isUpdating}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Nick"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setNewNick(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button disabled={isUpdating} onClick={handleUpdateNick}>{isUpdating ? 'Updating...' : 'Update'}</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
