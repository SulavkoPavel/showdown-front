import './header-profile-photo.css';
import stubHeaderAccountPhoto from '../../assets/Images/stub-header-account-photo.png';
import React, { useEffect, useState } from 'react';
import {myProfilePhotoSmall} from "../../api/users.ts";

interface Props {
    onClick?: () => void;
}

const HeaderProfilePhoto = ({ onClick }: Props) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const photoBlob = await myProfilePhotoSmall();
                const photoUrl = URL.createObjectURL(photoBlob);
                setPhotoUrl(photoUrl);
            } catch (error) {
                console.error('Error fetching user profile photo:', error);
                // Если произошла ошибка, можно использовать заглушку
                setPhotoUrl(stubHeaderAccountPhoto);
            }
        };

        fetchPhoto();

        // Очистка URL объекта при размонтировании компонента
        return () => {
            if (photoUrl) {
                URL.revokeObjectURL(photoUrl);
            }
        };
    }, []);

    return (
        <img
            src={photoUrl || stubHeaderAccountPhoto}
            className='header-profile-photo'
            onClick={onClick}
            alt="User Profile"
        />
    );
};

export default HeaderProfilePhoto;