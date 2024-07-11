import './common-header.css'
import './__game-name/common-header__game-name.css'
import '../SmallText/small-text.css'
import './__profile-menu/common-header__profile-menu.css'
import '../../main-container.css'
import TextLogo from '../TextLogo/TextLogo.tsx';
import React, {useState} from 'react';
import HeaderAccountPhoto from "../HeaderAccountPhoto/HeaderAccountPhoto.tsx";
import ProfileMenu from "../ProfileMenu/ProfileMenu.tsx";

interface Props {
    gameName?: string;
}

const CommonHeader = ({gameName}: Props) => {
    const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

    return (
        <header className='common-header'>
            <TextLogo/>
            <div className='small-text common-header__game-name'>
                {gameName}
            </div>
            <HeaderAccountPhoto
                onClick={() => setProfileMenuVisible(!isProfileMenuVisible)}
            />
            <ProfileMenu
                className='common-header__profile-menu'
                visible={isProfileMenuVisible}
            />
        </header>
    )
}

export default CommonHeader