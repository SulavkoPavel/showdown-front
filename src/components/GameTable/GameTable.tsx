import './game-table.css'

interface Props {
    children?: string;
    className?: string;
}

const GameTable = ({
                        children,
                        className = ''
                    }: Props) => {
    return (
        <div className='game-table'>
            {children}
        </div>
    )
}

export default GameTable