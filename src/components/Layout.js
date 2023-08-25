import React from 'react';
import style from '../styles/globals.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <header>
        <b>Header asd</b>
      </header>
      <main>{children}</main>
      <footer>
        <b>Footer</b>
      </footer>
    </div>
  );
};

export default Layout;
