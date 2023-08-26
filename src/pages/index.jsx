import Head from 'next/head';
import Layout from '@/components/Layout';
import Price from '@/components/home/Price';

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Seven B Indutries</title>
            </Head>
            <main>
                <Price />
            </main>
        </Layout>
    );
}
