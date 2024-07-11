import './profile-menu.css'
import './_visibility/_visable/profile-menu_visibility_visible.css'
import './_visibility/_hidden/profile-menu_visibility_hidden.css'
import '../HeaderAccountPhoto/header-account-photo.css'
import Button from "../Button/Button.tsx";
import {useState} from "react";
import {logout} from "../../api/auth.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    visible?: boolean;
    className?: string;
}

const ProfileMenu = ({
                         className,
                         visible = true
                     }: Props) => {
    const navigate = useNavigate();

    return (
        <div className={`profile-menu ${className} ${visible ? 'profile-menu_visibility_visible' : 'profile-menu_visibility_hidden'}`}>
            <Button
                text='Мой аккаунт'
                styleType={'secondary'}
                color='black'
                onClick={() => navigate('/profile-settings')}
            />
            <Button
                text='Выход'
                styleType={'secondary'}
                color='black'
                onClick={() => logout()}
            />
        </div>
    )
}

export default ProfileMenu