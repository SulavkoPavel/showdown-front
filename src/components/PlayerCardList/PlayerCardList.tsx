import './player-card-list.css'
import PlayerCard from "../PlayerCard/PlayerCard.tsx";
import {VotingResults} from "../../api/game.ts";
import {User} from "../../api/users.ts";

interface Props {
    players?: User[];
    isUserPhotoAtBottom?: boolean;
    isCardsRevealed?: boolean;
    votingResults?: VotingResults;
    votedUserIds?: number[];
    className?: string;
}

const PlayerCardList = ({
                            players,
                            isUserPhotoAtBottom = false,
                            isCardsRevealed = false,
                            votingResults = {
                                votingResults: [],
                                averageRating: 0,
                                allVotedTheSame: false
                            },
                            votedUserIds,
                            className
                        }: Props) => {
    return (
        <div className={`player-card-list ${className}`}>
            {players?.map(player => {
                const votingResult = votingResults?.votingResults.find(voting => voting.userId === player.id);

                return (
                    <PlayerCard
                        text={votingResult?.rating.toString()}
                        player={player}
                        stateStyle={isCardsRevealed ? 'revealed' : (votedUserIds?.includes(player.id) ? 'voted' : 'unvoted')}
                        isUserPhotoAtBottom={isUserPhotoAtBottom}
                    />
                );
            })}
        </div>
    )
}

export default PlayerCardList