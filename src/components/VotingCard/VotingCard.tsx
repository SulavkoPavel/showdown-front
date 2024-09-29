import './voting-card.css'
import './_state/_selected/voting-card_state_selected.css'
import './_state/_unselected/voting-card_state_unselected.css'

interface Props {
    text: string;
    stateStyle?: 'selected' | 'unselected';
    onClick?: () => void;
    className?: string;
}

const VotingCard = ({
                        text,
                        stateStyle = 'unselected',
                        onClick,
                        className = ''
                    }: Props) => {
    const stateClassName: Map<Props['stateStyle'], string> = new Map([
        ['selected', 'voting-card_state_selected'],
        ['unselected', 'voting-card_state_unselected']
    ]);

    return (
        <div onClick={onClick}>
            <div className={`voting-card ${stateClassName.get(stateStyle)} ${className}`}>
                {text}
            </div>
        </div>
    )
}

export default VotingCard