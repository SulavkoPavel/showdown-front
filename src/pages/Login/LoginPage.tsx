import React, {useEffect, useState} from 'react'
import './login-page.css'
import './__form/login-page__form.css'
import './__container/login-page__container.css'
import './__text_field/login-page__text-field.css'
import './__secondary-button/login-page__secondary-button.css'
import TextField, {TextFieldProps} from "../../components/TextField/TextField.tsx";
import Button from "../../components/Button/Button.tsx";
import Title from "../../components/Title/Title.tsx";
import HeaderWithLogo from "../../components/HeaderWithLogo/HeaderWithLogo.tsx";
import {useNavigate} from "react-router-dom";
import {login} from "../../api/auth.ts";

const LoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
    const [textFieldStatus, setTextFieldStatus] = useState<TextFieldProps['styleStatus']>('default');

    useEffect(() => {
        if (username && password) {
            setLoginButtonDisabled(false);
        } else {
            setLoginButtonDisabled(true);
        }
    }, [username, password]);


    return (
        <div className="login-page">
            <HeaderWithLogo/>
            <div className="login-page__container">
                <Title text="Вход"/>
                <div className="register-page__form">
                    <TextField
                        className="login-page__text-field"
                        value={username}
                        onValueChange={setUsername}
                        placeholder='Roman'
                        styleStatus={textFieldStatus}
                        label="Username"
                    />
                    <TextField
                        className="login-page__text-field"
                        value={password}
                        onValueChange={setPassword}
                        label="Password"
                        placeholder="••••••••••••"
                        styleStatus={textFieldStatus}
                        inputType="password"
                    />
                    <Button
                        text="Войти"
                        styleType={loginButtonDisabled ? 'primary-disabled' : 'primary'}
                        disabled={loginButtonDisabled}
                        onClick={
                        () => login(username, password)
                            .then(() => navigate('/my-tables'))
                            .catch(() => {
                                setTextFieldStatus('error');
                                setLoginButtonDisabled(true);
                            })
                    }
                    />
                    <Button
                        className="login-page__secondary-button"
                        text="Создать аккаунт"
                        styleType="secondary"
                        onClick={() => navigate("/register")}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginPage