import './player-card.css'
import './player-card-container.css'
import './player-card-container_reversed.css'
import './_state/_voted/player-card_state_voted.css'
import './_state/_unvoted/player-card_state_unvoted.css'
import './_state/_revealed/player-card_state_revealed.css'
import PlayerCardProfilePhoto from "../PlayerCardProfilePhoto/PlayerCardProfilePhoto.tsx";
import {User} from "../../api/users.ts";

interface Props {
    text?: string;
    player: User;
    stateStyle?: 'voted' | 'unvoted' | 'revealed';
    isUserPhotoAtBottom?: boolean;
    className?: string;
}

const PlayerCard = ({
                             text,
                             player,
                             stateStyle = 'unvoted',
                             isUserPhotoAtBottom = false,
                             className = ''
                         }: Props) => {
    const stateClassName: Map<Props['stateStyle'], string> = new Map([
        ['voted', 'player-card_state_voted'],
        ['unvoted', 'player-card_state_unvoted'],
        ['revealed', 'player-card_state_revealed']
    ]);

    return (
        <div className={`player-card-container ${isUserPhotoAtBottom && 'player-card-container_reversed'}`}>
            <div className='small-text'>
                {player.nickname}
            </div>
            <PlayerCardProfilePhoto
                userId={player.id}
            />
            <div className={`player-card ${stateClassName.get(stateStyle)} ${className}`}>
                {text}
            </div>
        </div>
    )
}

export default PlayerCard