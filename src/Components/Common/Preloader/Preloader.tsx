import React from 'react';
import preloader from '../../../Assets/Images/preloader.gif';

type PreloaderPropsType = {}

const Preloader: React.FC<PreloaderPropsType> = () => {
    return (
        <div>
            <img src={preloader} alt=""/>
        </div>
    )
}

export default Preloader;