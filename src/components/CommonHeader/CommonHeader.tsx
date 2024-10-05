import './common-header.css'
import './__game-name/common-header__game-name.css'
import '../SmallText/small-text.css'
import './__profile-menu/common-header__profile-menu.css'
import '../../main-container.css'
import TextLogo from '../TextLogo/TextLogo.tsx';
import React, {useEffect, useRef, useState} from 'react';
import HeaderProfilePhoto from "../HeaderProfilePhoto/HeaderProfilePhoto.tsx";
import ProfileMenu from "../ProfileMenu/ProfileMenu.tsx";

interface Props {
    gameName?: string;
}

const CommonHeader = ({gameName}: Props) => {
    const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
    const profilePhotoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profilePhotoRef.current &&
                !profilePhotoRef.current.contains(event.target as Node)
            ) {
                setProfileMenuVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [profilePhotoRef]);

    return (
        <header className='common-header'>
            <TextLogo/>
            <div className='small-text common-header__game-name'>
                {gameName}
            </div>
            <div
                ref={profilePhotoRef}
                onClick={() => setProfileMenuVisible(!isProfileMenuVisible)}
            >
                <HeaderProfilePhoto/>
                <ProfileMenu
                    className='common-header__profile-menu'
                    visible={isProfileMenuVisible}
                />
            </div>
        </header>
    )
}

export default CommonHeader