import './participant-card-list.css'
import React, {useEffect, useState} from 'react';
import ParticipantCard from "../ParticipantCard/ParticipantCard.tsx";
import {getTable} from "../../api/tables.ts";
import {addOnNewGameHandler, addOnVoteHandler, connectToWs} from "../../api/game.ts";

interface Props {
    participants?: User[];
    isUserPhotoAtBottom?: boolean;
    className?: string;
}

const ParticipantCardList = ({
                                 participants,
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
        <div className={`participant-card-list ${className}`}>
            {participants?.map(participant =>
                <ParticipantCard
                    text={participant.username}
                    stateStyle={votedUserIds.includes(participant.id) ? 'voted' : 'unvoted'}
                    isUserPhotoAtBottom={isUserPhotoAtBottom}
                />
            )}
        </div>
    )
}

export default ParticipantCardList