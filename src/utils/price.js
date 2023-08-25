import React from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import AirplanemodeActiveSharpIcon from '@mui/icons-material/AirplanemodeActiveSharp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import style from '../styles/pricing.module.scss'

export const pricings = [
    {
        id: 1,
        name: "STANDART",
        price: 'FREE',
        description: `
DISABLE ADVERTISING ❌ <br />
DAILY BONUS INCREASED BY 2X ❌ <br />
POSSIBILITY TO PUT YOUR AVATAR ❌ <br />
POSSIBILITY TO PUT NICK UP TO 16 SYMBOLS ❌ <br />
DISCOUNT ON ANY CRYPTO CURRENCE 5% ✅ <br />
PROFILE MARK "🎁" ✅ <br />
INCREASED TRANSFER LIMIT BY 1.000.000 (1е6) ✅ <br />
        `,
        time: '7 DAYS',
        stausEmoji: '🎁',
        icon: (
            <TelegramIcon
                className={style.icon}
            />
        ),
        bgColor: 'linear-gradient(-45deg,#f403d1,#64b5f6)',
    },
    {
        id: 2,
        name: "VIP",
        price: '99',
        description: `
POSSIBILITY TO PUT YOUR AVATAR ❌ <br />
DISABLE ADVERTISING ✅ <br />
DAILY BONUS INCREASED BY 2X ✅ <br />
DISCOUNT ON ANY CRYPTO CURRENCE 7% ✅ <br />
PROFILE MARK "💎" ✅ <br />
INCREASED TRANSFER LIMIT BY 1.000.000.000 (1е9) ✅ <br />
POSSIBILITY TO PUT NICK UP TO 16 SYMBOLS ✅ <br />
        `,
        time: '30 DAYS',
        stausEmoji: '💎',
        icon: (
            <AirplanemodeActiveSharpIcon
                className={style.icon2}
            />
        ),
        bgColor: 'linear-gradient(-45deg,#ffec61,#f321d7)',
    },
    {
        id: 3,
        name: "PREMIUM",
        price: '300',
        description: `      
POSSIBILITY TO PUT YOUR AVATAR ✅ <br />
DISABLE ADVERTISING ✅ <br />
DAILY BONUS INCREASED BY 2X ✅ <br />
DISCOUNT ON ANY CRYPTO CURRENCE 10% ✅ <br />
PROFILE MARK "⭐️" ✅ <br />
INCREASED TRANSFER LIMIT BY 1.000.000.000.000 (1е12) ✅ <br />
POSSIBILITY TO PUT NICK UP TO 16 SYMBOLS ✅ <br />
        `,
        time: '30 DAYS',
        stausEmoji: '⭐️',
        icon: (
            <RocketLaunchIcon
                className={style.icon3}
            />
        ),
        bgColor: 'linear-gradient(-45deg,#24ff72,#9a4eff)',
    },
];
