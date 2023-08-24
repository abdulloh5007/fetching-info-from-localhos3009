import style from '../../styles/pricing.module.scss'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { pricings } from '../../utils/price'
import { Icon, IconButton } from '@mui/material';

export default function Price() {
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );


    return (
        <div className={style.price}>
            <div className={style.cards}>
                {
                    pricings.map((e, i) => {
                        return (
                            <div key={i}>
                                <Card sx={{ minWidth: 300, p: 2, background: e.bgColor, color: 'white', borderRadius: '15px', border: '1px solid #3e3e3e' }}>
                                    <CardContent>
                                        <Typography sx={{ textAlign: 'center', mb: 1.5 }}>
                                            {e.icon}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'center' }} variant="h5" component="div">
                                            {e.name}
                                        </Typography>
                                        <Typography variant='h3' sx={{ mt: 1.5, textAlign: 'center', color: 'white' }} color="text.secondary">
                                            {e.price} <sup>UC</sup>
                                        </Typography>
                                        <Typography variant="body2">
                                            well meaning and kindly.
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'center' }}>
                                        <Button sx={{ border: '1px solid #198BDF', background: 'white' }} size="small">АКТИВИРОВАТЬ {e.stausEmoji}</Button>
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