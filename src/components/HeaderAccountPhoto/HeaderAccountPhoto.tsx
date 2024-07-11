import '../HeaderAccountPhoto/header-account-photo.css'
import stubHeaderAccountPhoto from '../../assets/Images/stub-header-account-photo.png';
import React from 'react';

interface Props {
    onClick?: () => void;
}

const HeaderAccountPhoto = ({onClick}: Props) => {
    return (
        <img
            src={stubHeaderAccountPhoto}
            className='header-account-photo'
            onClick={onClick}
        />
    )
}

export default HeaderAccountPhoto