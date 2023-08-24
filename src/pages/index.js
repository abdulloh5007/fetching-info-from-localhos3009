import Head from 'next/head';
import Layout from '@/components/Layout';
import LoginForm from '@/components/home/LoginForm';
import style from '../styles/globals.module.scss'
import Price from '@/components/home/Price';

export default function Home() {
  return (
    <div className={style.container}>
      <Layout>
        <Head>
          <title>Login Page</title>
        </Head>
        <main>
          <LoginForm />
          <Price />
        </main>
      </Layout>
    </div>
  );
}
