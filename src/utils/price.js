import React from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import AirplanemodeActiveSharpIcon from '@mui/icons-material/AirplanemodeActiveSharp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export const pricings = [
    {
        id: 1,
        name: "STANDART",
        price: 'FREE',
        description: "STANDART pricing",
        time: '7 DAYS',
        stausEmoji: '🎁',
        icon: (
            <TelegramIcon
                sx={{
                    fontSize: '90px',
                    borderRadius: '50%',
                    boxShadow: '0 10px 10px rgba(0,0,0,.1)',
                    p: 1,
                    background: 'linear-gradient(-45deg,#f403d1,#64b5f6)',
                }}
            />
        ),
        bgColor: 'linear-gradient(-45deg,#f403d1,#64b5f6)',
    },
    {
        id: 2,
        name: "VIP",
        price: '99',
        description: "VIP pricing",
        time: '30 DAYS',
        stausEmoji: '💎',
        icon: (
            <AirplanemodeActiveSharpIcon
                sx={{
                    fontSize: '90px',
                    borderRadius: '50%',
                    boxShadow: '0 10px 10px rgba(0,0,0,.1)',
                    p: 1,
                    transform: 'rotate(45deg)',
                    background: 'linear-gradient(-45deg,#ffec61,#f321d7)',
                }}
            />
        ),
        bgColor: 'linear-gradient(-45deg,#ffec61,#f321d7)',
    },
    {
        id: 3,
        name: "PREMIUM",
        price: '300',
        description: "PREMIUM pricing",
        time: '30 DAYS',
        stausEmoji: '⭐️',
        icon: (
            <RocketLaunchIcon
                sx={{
                    fontSize: '90px',
                    borderRadius: '50%',
                    boxShadow: '0 10px 10px rgba(0,0,0,.1)',
                    p: 1,
                    background: 'linear-gradient(-45deg,#24ff72,#9a4eff)',
                }}
            />
        ),
        bgColor: 'linear-gradient(-45deg,#24ff72,#9a4eff)',
    },
];
