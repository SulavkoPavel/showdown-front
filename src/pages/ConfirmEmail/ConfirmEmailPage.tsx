import React, {useEffect, useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import {getMyTables, TableCreate} from "../../api/tables.ts";
import TableList from "../../components/TableList/TableList.tsx";
import Title from "../../components/Title/Title.tsx";
import './__container/confirm-email-info-page__container.css'
import './__message/confirm-email-info-page__message.css'
import Button from "../../components/Button/Button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {confirmEmail} from "../../api/auth.ts";

const ConfirmEmailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleConfirmEmail = () => {
        if (token) {
            confirmEmail(token)
                .then(() => navigate("/my-tables"))
                .catch(() => navigate("/confirm-email-info"));
        }
    };

    React.useEffect(() => {
        handleConfirmEmail();
    }, []);

    return (
        <div>
            <h1>Confirming your email...</h1>
        </div>
    );
}

export default ConfirmEmailPage