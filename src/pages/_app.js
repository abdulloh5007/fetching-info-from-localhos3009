import App from 'next/app';
import { UserProvider } from '@/components/Context/context';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            // <>
            //     <style jsx global>{`
            //         body {
            //             margin: 0;
            //             padding: 0;
            //             background-color: #828282; /* Ваш цвет фона */
            //             /* Дополнительные стили для body */
            //         }

            //         html {
            //             /* Стили для html */
            //         }
            //     `}</style>
            // </>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        );
    }
}
