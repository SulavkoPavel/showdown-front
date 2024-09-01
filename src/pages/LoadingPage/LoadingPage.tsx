import React from 'react'
import './loading-page.css'
import LoadingCard from "../../components/LoadingCard/LoadingCard.tsx";

interface Props {
    isLoading: boolean;
    children: string;
}

const LoadingPage = ({
                         isLoading = true,
                         children = ''
                     }: Props) => {
    return (
        <div className="loading-page">
            {isLoading ? (
                <LoadingCard/>
            ) : (
                <div className="loading-page__content">
                    {children}
                </div>
            )}
        </div>
    )
}

export default LoadingPage