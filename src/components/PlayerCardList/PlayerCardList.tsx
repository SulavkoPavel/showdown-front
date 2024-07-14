import './player-card-list.css'
import React, {useEffect, useState} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard.tsx";
import {getTable} from "../../api/tables.ts";
import {addOnNewGameHandler, addOnVoteHandler, connectToWs} from "../../api/game.ts";

interface Props {
    players?: User[];
    isUserPhotoAtBottom?: boolean;
    className?: string;
}

const PlayerCardList = ({
                                 players,
                                 isUserPhotoAtBottom = false,
                                 className
                             }: Props) => {
    const [votedUserIds, setVotedUserIds] = useState<number[]>([]);

    useEffect(() => {
        addOnVoteHandler(payload => {
            const voteView = JSON.parse(payload.body);
            if (voteView.voted) {
                setVotedUserIds(prevVotedUserIds => [voteView.userId, ...prevVotedUserIds])
            } else {
                setVotedUserIds(prevVotedUserIds => prevVotedUserIds.filter(votedUserId => votedUserId !== voteView.userId));
            }
        });
        addOnNewGameHandler(payload => {
            setVotedUserIds([]);
        });
    }, []);

    return (
        <div className={`player-card-list ${className}`}>
            {players?.map(player =>
                <PlayerCard
                    text={player.username}
                    stateStyle={votedUserIds.includes(player.id) ? 'voted' : 'unvoted'}
                    isUserPhotoAtBottom={isUserPhotoAtBottom}
                />
            )}
        </div>
    )
}

export default PlayerCardList