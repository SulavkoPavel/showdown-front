import './participant-card.css'
import './participant-card-container.css'
import './participant-card-container_reversed.css'
import './_state/_voted/participant-card_state_voted.css'
import './_state/_unvoted/participant-card_state_unvoted.css'
import HeaderAccountPhoto from "../HeaderAccountPhoto/HeaderAccountPhoto.tsx";

interface Props {
    text: string;
    stateStyle?: 'voted' | 'unvoted';
    isUserPhotoAtBottom?: boolean;
    className?: string;
}

const ParticipantCard = ({
                             text,
                             stateStyle = 'unvoted',
                             isUserPhotoAtBottom = false,
                             className = ''
                         }: Props) => {
    const stateClassName: Map<Props['stateStyle'], string> = new Map([
        ['voted', 'participant-card_state_voted'],
        ['unvoted', 'participant-card_state_unvoted']
    ]);

    return (
        <div className={`participant-card-container ${isUserPhotoAtBottom && 'participant-card-container_reversed'}`}>
            <HeaderAccountPhoto/>
            <div className={`participant-card ${stateClassName.get(stateStyle)} ${className}`}>
                {text}
            </div>
        </div>
    )
}

export default ParticipantCard