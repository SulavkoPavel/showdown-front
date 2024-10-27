import './game-table.css'
import {ReactNode} from "react";

interface Props {
    children?: ReactNode;
    className?: string;
}

const GameTable = ({
                        children,
                    }: Props) => {
    return (
        <div className='game-table'>
            {children}
        </div>
    )
}

export default GameTable