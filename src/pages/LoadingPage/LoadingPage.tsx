import './loading-page.css'
import './__content/loading-page__content.css'
import LoadingCard from "../../components/LoadingCard/LoadingCard.tsx";

interface Props {
    isLoading: boolean;
    children: JSX.Element|JSX.Element[];
}

const LoadingPage = ({
                         isLoading = true,
                         children
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