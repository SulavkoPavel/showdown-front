import './common-header.css'
import './__game-name/common-header__game-name.css'
import './__game-name-container/common-header__game-name-container.css'
import '../SmallText/small-text.css'
import './__profile-menu/common-header__profile-menu.css'
import '../../main-container.css'
import TextLogo from '../TextLogo/TextLogo.tsx';
import React, {useEffect, useRef, useState} from 'react';
import HeaderProfilePhoto from "../HeaderProfilePhoto/HeaderProfilePhoto.tsx";
import ProfileMenu from "../ProfileMenu/ProfileMenu.tsx";
import linkIcon from '../../assets/Icons/link.svg';
import {TableView} from "../../api/tables.ts";

interface Props {
    table: TableView
}

const CommonHeader = ({table}: Props) => {
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
            {
                table && (
                    <div className='common-header__game-name-container'
                        onClick={() => navigator.clipboard.writeText(import.meta.env.VITE_APP_BASE_URL + '/' + table.id)}>
                        <div className='common-header__game-name'>
                            <img src={linkIcon} alt='Copy link'/>
                            <div className='small-text'>
                                {table.name}
                            </div>
                        </div>
                    </div>
                )
            }
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