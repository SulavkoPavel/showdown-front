import React, {useEffect, useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import Title from "../../components/Title/Title.tsx";
import './__title-container/profile-settings-page__title-container.css'
import './__form/profile-settings-page__form.css'
import TextField, {TextFieldProps} from "../../components/TextField/TextField.tsx";
import Button from "../../components/Button/Button.tsx";
import {useNavigate, useParams} from "react-router-dom";

const ProfileSettingsPage = () => {
    const {tableId} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [textFieldStatus, setTextFieldStatus] = useState<TextFieldProps['styleStatus']>('default');
    const [profileName, setProfileName] = useState('');
    const [profile, setProfile] = useState<profileView>();

    // useEffect(() => {
    //     console.log(id);
    //     getprofile(id).then(profile => {
    //         setProfile(profile);
    //         setProfileName(profile.name)
    //     });
    // }, []);

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
                    styleStatus={textFieldStatus}
                />
                <TextField
                    label='Password'
                    placeholder='••••••••••••'
                    inputType='password'
                    value={profileName}
                    onValueChange={setProfileName}
                    styleStatus={textFieldStatus}
                />
                <Button
                    text='Сохранить'
                />
            </div>
        </div>
    );
}

export default ProfileSettingsPage