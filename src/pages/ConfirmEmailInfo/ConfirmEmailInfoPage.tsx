import React, {useEffect, useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import Title from "../../components/Title/Title.tsx";
import './confirm-email-info-page.css'
import './__container/confirm-email-info-page__container.css'
import './__message/confirm-email-info-page__message.css'
import Button from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {me, User} from "../../api/users.ts";

const ConfirmEmailInfoPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        me().then(me => setUser(me));
    }, []);

    return (
        <div className="confirm-email-info-page">
            <CommonHeader/>
            <div className='confirm-email-info-page__container'>
                <Title text='Проверьте почту'/>
                <div className='confirm-email-info-page__message'>
                    Письмо для подтверждения профиля было отправлено на {user?.email}
                </div>
                <Button
                    text='Письмо не пришло'
                    styleType='secondary'
                />
            </div>
        </div>
    );
}

export default ConfirmEmailInfoPage