import './profile-menu.css'
import './_visibility/_visable/profile-menu_visibility_visible.css'
import './_visibility/_hidden/profile-menu_visibility_hidden.css'
import '../HeaderProfilePhoto/header-profile-photo.css'
import Button from "../Button/Button.tsx";
import {logout} from "../../api/auth.ts";

interface Props {
    visible?: boolean;
    className?: string;
}

const ProfileMenu = ({
                         className,
                         visible = true
                     }: Props) => {
    return (
        <div className={`profile-menu ${className} ${visible ? 'profile-menu_visibility_visible' : 'profile-menu_visibility_hidden'}`}>
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