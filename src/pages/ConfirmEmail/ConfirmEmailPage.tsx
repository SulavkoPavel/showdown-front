import React from 'react'
import './__container/confirm-email-info-page__container.css'
import './__message/confirm-email-info-page__message.css'
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