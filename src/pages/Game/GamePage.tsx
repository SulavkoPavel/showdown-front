import React, {useEffect, useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import {useParams} from "react-router-dom";
import {getTable, TableView} from "../../api/tables.ts";
import VotingCardList from "../../components/VotingCardList/VotingCardList.tsx";
import {
    addOnNewGameHandler,
    addOnVotingResultsHandler,
    connectToWs, newGame,
    createVote,
    deleteVote,
    showdown, addOnVoteHandler, activeAtTable, addOnPlayerActivityHandler
} from "../../api/game.ts";
import GameTable from "../../components/GameTable/GameTable.tsx";
import Button from "../../components/Button/Button.tsx";
import PlayerCardList from "../../components/PlayerCardList/PlayerCardList.tsx";

import './game-page.css'
import './__new-game-container/game-page__new-game-container.css'
import './__voting-card-list/game-page__voting-card-list.css'
import './__top-player-list/game-page__top-player-list.css'
import './__bottom-player-list/game-page__bottom-player-list.css'
import './__playground/game-page__playground.css'
import Title from "../../components/Title/Title.tsx";

const GamePage = () => {
    const {tableId} = useParams<{ tableId: string }>();
    const [table, setTable] = useState<TableView>();
    const [activePlayers, setActivePlayers] = useState<User[]>([]);
    const [isShowdown, setIsShowdown] = useState(false);
    const [votingResults, setVotingResults] = useState();
    const [votedUserIds, setVotedUserIds] = useState<number[]>([]);

    useEffect(() => {
        getTable(tableId).then(table => {
            setTable(table);
            setActivePlayers(table.activePlayers)
            setIsShowdown(table.games[0].showdown);
            table.players.sort((a, b) => a.id - b.id);
            connectToWs(tableId);
            addOnNewGameHandler(payload => {
                setIsShowdown(false);
                setVotedUserIds([]);
            });
            addOnVotingResultsHandler(payload => {
                setIsShowdown(true);
                setVotingResults(JSON.parse(payload.body));
            });
            addOnVoteHandler(payload => {
                const voteView = JSON.parse(payload.body);
                if (voteView.voted) {
                    setVotedUserIds(prevVotedUserIds => [voteView.userId, ...prevVotedUserIds])
                } else {
                    setVotedUserIds(prevVotedUserIds => prevVotedUserIds.filter(votedUserId => votedUserId !== voteView.userId));
                }
            });
            addOnPlayerActivityHandler(payload => {
                const playerActivity = JSON.parse(payload.body);
                const user = playerActivity.user as User;

                setActivePlayers(prevActivePlayers => {
                    if (playerActivity.isActive) {
                        if (!prevActivePlayers.some(activePlayer => activePlayer.id === user.id)) {
                            return [user, ...prevActivePlayers];
                        }
                    } else {
                        return prevActivePlayers.filter(activePlayer => activePlayer.id !== user.id);
                    }
                    return prevActivePlayers;
                });
            })
        });
    }, []);

    return (
        <div className="game-page">
            <CommonHeader
                gameName={table?.name}
            />

            <div
                className='game-page__playground'>
                <PlayerCardList
                    className='game-page__top-player-list'
                    players={activePlayers?.sort().slice(0, 3)}
                    votedUserIds={votedUserIds}
                    isCardsRevealed={isShowdown}
                    votingResults={votingResults}
                />

                {isShowdown ?
                    <GameTable>
                        <div className='game-page__new-game-container'>
                            <Title text={votingResults ? votingResults.averageRating : table?.games[0].averageRating}/>
                            <Button
                                text='Новая игра'
                                styleType='secondary'
                                onClick={() => newGame(tableId)}
                            />
                        </div>
                    </GameTable>
                    :
                    <GameTable>
                        <Button
                            text='Раскрыть карты'
                            styleType='secondary'
                            className='game-table__reveal'
                            onClick={() => showdown(tableId)}
                        />
                    </GameTable>
                }

                <PlayerCardList
                    className='game-page__bottom-player-list'
                    players={activePlayers?.sort().slice(3, 6)}
                    votedUserIds={votedUserIds}
                    isUserPhotoAtBottom={true}
                    isCardsRevealed={isShowdown}
                    votingResults={votingResults}
                />
            </div>

            <VotingCardList
                className='game-page__voting-card-list'
                votingSystem={table?.votingSystem}
                onSelect={voteValue => createVote(tableId, voteValue)}
                onUnselect={voteValue => deleteVote(tableId, voteValue)}
            />
        </div>
    );
}

export default GamePage