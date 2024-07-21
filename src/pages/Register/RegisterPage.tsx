import React, {useEffect, useState} from 'react'
import './register-page.css'
import './__form/register-page__form.css'
import './__container/register-page__container.css'
import './__text_field/register-page__text-field.css'
import './__secondary-button/register-page__secondary-button.css'
import TextField, {TextFieldProps} from "../../components/TextField/TextField.tsx";
import Button from "../../components/Button/Button.tsx";
import Title from "../../components/Title/Title.tsx";
import HeaderWithLogo from "../../components/HeaderWithLogo/HeaderWithLogo.tsx";
import {useNavigate} from "react-router-dom";
import {login, register} from "../../api/auth.ts";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);
    const [textFieldStatus, setTextFieldStatus] = useState<TextFieldProps['styleStatus']>('default');

    useEffect(() => {
        if (username && password) {
            setRegisterButtonDisabled(false);
        } else {
            setRegisterButtonDisabled(true);
        }
    }, [username, password]);


    return (
        <div className="register-page">
            <HeaderWithLogo/>
            <div className="register-page__container">
                <Title text="Регистрация"/>
                <div className="register-page__form">
                    <TextField
                        className="register-page__text-field"
                        value={username}
                        onValueChange={setUsername}
                        styleStatus={textFieldStatus}
                        placeholder='Roman'
                        label="Username"
                    />
                    <TextField
                        className="register-page__text-field"
                        value={password}
                        onValueChange={setPassword}
                        label="Password"
                        placeholder="••••••••••••"
                        styleStatus={textFieldStatus}
                        inputType="password"
                    />
                    <Button
                        text="Создать аккаунт"
                        disabled={registerButtonDisabled}
                        styleType={registerButtonDisabled ? 'primary-disabled' : 'primary'}
                        onClick={
                            () => register(username, password)
                                .then(() => login(username, password)
                                    .then(() => navigate('/my-tables')))
                                .catch(() => {
                                    setTextFieldStatus('error');
                                    setRegisterButtonDisabled(true);
                                })
                        }
                    />
                    <Button
                        className="register-page__secondary-button"
                        text="У меня есть аккаунт"
                        styleType="secondary"
                        onClick={() => navigate("/login")}
                    />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage