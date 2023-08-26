import style from '../../styles/pricing.module.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { pricings } from '../../utils/price'
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Price() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const router = useRouter();

    let interval = null;

    return (
        <div className={style.price}>
            <div className={style.cards}>
                {
                    pricings.map((e, i) => {
                        return (
                            <div key={i} className={style.card}>
                                <Card className={style.cardDiv} sx={{ background: e.bgColor }}>
                                    <CardContent>
                                        <Typography sx={{ textAlign: 'center', mb: 1.5 }}>
                                            {e.icon}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'center' }} variant="h5" component="div" data-value={e.name} onMouseOver={(event) => {
                                            let iteration = 0;

                                            clearInterval(interval);

                                            interval = setInterval(() => {
                                                event.target.innerText = event.target.innerText
                                                    .split("")
                                                    .map((letter, index) => {
                                                        if (index < iteration) {
                                                            return event.target.dataset.value[index];
                                                        }

                                                        return letters[Math.floor(Math.random() * 26)]
                                                    })
                                                    .join("");

                                                if (iteration >= event.target.dataset.value.length) {
                                                    clearInterval(interval);
                                                }

                                                iteration += 1 / 3;
                                            }, 30);
                                        }}>
                                            {e.name}
                                        </Typography>
                                        <Typography variant='h3' sx={{ mt: 1.5, textAlign: 'center', color: 'white' }}>
                                            {e.price} <sup>UC</sup>
                                        </Typography>
                                        <div dangerouslySetInnerHTML={{ __html: e.description }} className={style.description} />
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'center' }}>
                                        <Button onClick={() => router.push('/login')} sx={{ border: '1px solid #198BDF', background: 'white', p: 1.2 }} size="small">АКТИВИРОВАТЬ {e.stausEmoji}</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}