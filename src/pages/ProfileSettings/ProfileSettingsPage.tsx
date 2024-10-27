import {useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import Title from "../../components/Title/Title.tsx";
import './__title-container/profile-settings-page__title-container.css'
import './__form/profile-settings-page__form.css'
import TextField from "../../components/TextField/TextField.tsx";

const ProfileSettingsPage = () => {
    const [profileName, setProfileName] = useState('');
    return (
        <div className="profile-settings-page">
            <CommonHeader/>
            <div className='profile-settings-page__title-container'>
                <Title text='Настройки аккаунта'/>
            </div>
            <div className='profile-settings-page__form'>
                <TextField
                    label='Username'
                    placeholder='Ivan'
                    value={profileName}
                    onValueChange={setProfileName}
                />
                <TextField
                    label='Password'
                    placeholder='••••••••••••'
                    inputType='password'
                    value={profileName}
                    onValueChange={setProfileName}
                />
            </div>
        </div>
    );
}

export default ProfileSettingsPage