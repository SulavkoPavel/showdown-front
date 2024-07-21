import './text-logo.css'
import {useNavigate} from "react-router-dom";

const TextLogo = () => {
    const navigate = useNavigate();

    return (
        <h3
            className='text-logo'
            onClick={() => navigate('/my-tables')}
        >
            Showdown
        </h3>
    )
}

export default TextLogo