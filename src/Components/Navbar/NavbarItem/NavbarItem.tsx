import React from 'react';
import styles from './NavbarItem.module.css';
import { NavLink } from 'react-router-dom';

type NavbarItemProps = {
  itemName: string;
  url: string;
};

function NavbarItem(props: NavbarItemProps) {
  return (
    <NavLink
      to={'/' + props.url}
      className={styles.navbarItemWrapper}
      activeClassName={styles.activeNavbarLink}
    >
      {props.itemName}
    </NavLink>
  );
}

export default NavbarItem;
