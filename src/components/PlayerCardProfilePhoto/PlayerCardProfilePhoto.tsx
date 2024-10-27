import './player-card-profile-photo.css';
import stubHeaderAccountPhoto from '../../assets/Images/stub-header-account-photo.png';
import {useEffect, useState} from 'react';
import {userProfilePhotoSmall} from "../../api/users.ts";

interface Props {
    userId: number;
    onClick?: () => void;
}

const PlayerCardProfilePhoto = ({ userId, onClick }: Props) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const photoBlob = await userProfilePhotoSmall(userId);
                const photoUrl = URL.createObjectURL(photoBlob);
                setPhotoUrl(photoUrl);
            } catch (error) {
                console.error('Error fetching user profile photo:', error);
                // Если произошла ошибка, можно использовать заглушку
                setPhotoUrl(stubHeaderAccountPhoto);
            }
        };

        fetchPhoto();

        return () => {
            if (photoUrl) {
                URL.revokeObjectURL(photoUrl);
            }
        };
    }, [userId]);

    return (
        <img
            src={photoUrl || stubHeaderAccountPhoto}
            className='player-card-profile-photo'
            onClick={onClick}
            alt="User Profile"
        />
    );
};

export default PlayerCardProfilePhoto;