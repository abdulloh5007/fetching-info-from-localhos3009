import React from 'react';
import style from '../styles/globals.module.scss'
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <header>
        <b>Header asd</b>
        <Link href='/login'>Login</Link>
      </header>
      <main>{children}</main>
      <footer>
        <b>Footer</b>
      </footer>
    </div>
  );
};

export default Layout;
