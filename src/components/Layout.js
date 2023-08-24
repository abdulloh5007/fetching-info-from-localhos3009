import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
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
