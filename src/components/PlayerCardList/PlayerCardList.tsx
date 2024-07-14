import './player-card-list.css'
import React, {useEffect, useState} from 'react';
import PlayerCard from "../PlayerCard/PlayerCard.tsx";
import {getTable} from "../../api/tables.ts";
import {addOnNewGameHandler, addOnVoteHandler, connectToWs, VotingResults} from "../../api/game.ts";

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
                            votingResults,
                            votedUserIds,
                            className
                        }: Props) => {
    return (
        <div className={`player-card-list ${className}`}>
            {players?.map(player => {
                const votingResult = votingResults?.votingResults.find(result => result.userId === player.id);

                return (
                    <PlayerCard
                        text={votingResult?.rating}
                        stateStyle={isCardsRevealed ? 'revealed' : (votedUserIds?.includes(player.id) ? 'voted' : 'unvoted')}
                        isUserPhotoAtBottom={isUserPhotoAtBottom}
                    />
                );
            })}
        </div>
    )
}

export default PlayerCardList