import React from 'react';
import styles from './Navbar.module.css';
import NavbarItem from './NavbarItem/NavbarItem';

function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
      <NavbarItem url={'profile'} itemName={'Profile'} />
      <NavbarItem url={'messages'} itemName={'Messages'} />
      <NavbarItem url={'users'} itemName={'Users'} />
      <NavbarItem url={'news'} itemName={'News'} />
      <NavbarItem url={'settings'} itemName={'Settings'} />
    </div>
  );
}

export default Navbar;
