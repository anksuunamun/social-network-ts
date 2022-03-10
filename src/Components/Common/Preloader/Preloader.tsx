import React from 'react';
import preloader from '../../../Assets/Images/preloader.gif';
import styles from './Preloader.module.css';

type PreloaderPropsType = {
  small?: boolean;
};

const Preloader: React.FC<PreloaderPropsType> = (props) => {
  return (
    <div>
      <img
        src={preloader}
        className={`${props.small ? styles.smallPreloader : ''}`}
        alt="preloader"
      />
    </div>
  );
};

export default Preloader;
