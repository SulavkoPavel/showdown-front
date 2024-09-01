import React, {useEffect, useRef, useState} from 'react'
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
import {login, register, userWithEmailExists, userWithNicknameExists} from "../../api/auth.ts";
import validator from 'validator';
import LoadingPage from "../LoadingPage/LoadingPage.tsx";

enum Steps {
    EMAIL,
    PASSWORD,
    NICKNAME
}

const stepTitles: { [key in Steps]: string } = {
    [Steps.EMAIL]: 'Введите email',
    [Steps.PASSWORD]: 'Придумайте пароль',
    [Steps.NICKNAME]: 'Придумайте ник',
};

const RegisterPage = () => {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const nicknameRef = useRef<HTMLInputElement>();

    const [step, setStep] = useState<Steps>(Steps.EMAIL);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);
    const [textFieldStatus, setTextFieldStatus] = useState<TextFieldProps['styleStatus']>('default');
    const [isLoading, setIsLoading] = useState(false);

    const isEmailValid = (email: string): boolean => {
        return validator.isEmail(email);
    };

    useEffect(() => {
        switch (step) {
            case Steps.EMAIL:
                setRegisterButtonDisabled(email === '');
                break;
            case Steps.PASSWORD:
                setRegisterButtonDisabled(password === '');
                break;
            case Steps.NICKNAME:
                setRegisterButtonDisabled(nickname === '');
                break;
        }
    }, [email, password, nickname, step]);

    const handleNextStep = async () => {
        try {
            switch (step) {
                case Steps.EMAIL:
                    if (!isEmailValid(email)) {
                        setTextFieldStatus('error');
                        setRegisterButtonDisabled(true);
                        return;
                    }
                    const emailResult = await userWithEmailExists(email);
                    if (!emailResult.exists) {
                        setStep(Steps.PASSWORD);
                    } else {
                        setTextFieldStatus('error');
                        setRegisterButtonDisabled(true);
                    }
                    break;
                case Steps.PASSWORD:
                    setStep(Steps.NICKNAME);
                    break;
                case Steps.NICKNAME:
                    const nicknameResult = await userWithNicknameExists(nickname);
                    if (!nicknameResult.exists) {
                        handleSubmit();
                    } else {
                        setTextFieldStatus('error');
                        setRegisterButtonDisabled(true);
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            setTextFieldStatus('error');
            setRegisterButtonDisabled(true);
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);
        register(nickname, email, password)
            .then(() => login(email, password)
                .then(() => {
                    navigate('/confirm-email-info');
                    setIsLoading(false);
                }))
            .catch(() => {
                setTextFieldStatus('error');
                setRegisterButtonDisabled(true);
            });
    };

    const resetTextFieldStatus = () => {
        setTextFieldStatus('default');
    };

    return (
        <LoadingPage isLoading={isLoading}>
            <div className="register-page">
                <HeaderWithLogo/>
                <div className="register-page__container">
                    <Title text={stepTitles[step]}/>

                    <div className="register-page__form">
                        {step === Steps.EMAIL && (
                            <TextField
                                className="register-page__text-field"
                                value={email}
                                onValueChange={(value) => {
                                    setEmail(value);
                                    resetTextFieldStatus();
                                }}
                                styleStatus={textFieldStatus}
                                placeholder='roman@mail.com'
                                label="Email"
                            />
                        )}
                        {step === Steps.PASSWORD && (
                            <TextField
                                className="register-page__text-field"
                                value={password}
                                onValueChange={(value) => {
                                    setPassword(value);
                                    resetTextFieldStatus(); // Сброс статуса при изменении значения
                                }}
                                label="Password"
                                placeholder="••••••••••••"
                                styleStatus={textFieldStatus}
                                inputType="password"
                            />
                        )}
                        {step === Steps.NICKNAME && (
                            <TextField
                                className="register-page__text-field"
                                value={nickname}
                                onValueChange={(value) => {
                                    setNickname(value);
                                    resetTextFieldStatus(); // Сброс статуса при изменении значения
                                }}
                                styleStatus={textFieldStatus}
                                placeholder='Roman'
                                label="Nickname"
                            />
                        )}


                        <Button
                            text={step < Steps.NICKNAME ? "Далее" : "Создать аккаунт"}
                            disabled={registerButtonDisabled}
                            styleType={registerButtonDisabled ? 'primary-disabled' : 'primary'}
                            onClick={handleNextStep}
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
        </LoadingPage>
    )
}

export default RegisterPage