import Head from 'next/head';
import Layout from '@/components/Layout';
import Price from '@/components/home/Price';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Login Page</title>
      </Head>
      <main>
        <Price />
      </main>
    </Layout>
  );
}
