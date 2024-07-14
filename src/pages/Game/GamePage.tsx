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
    showdown
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
    const [isGameActive, setIsGameActive] = useState(true);
    const [votingResults, setVotingResults] = useState();

    useEffect(() => {
        getTable(tableId).then(table => {
            setTable(table);
            setIsGameActive(!table.games[0].showdown);
            table.players.sort((a, b) => a.id - b.id);
            connectToWs();
            addOnNewGameHandler(payload => {
                setIsGameActive(true);
            });
            addOnVotingResultsHandler(payload => {
                setIsGameActive(false);
                setVotingResults(JSON.parse(payload.body));
            });
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
                    players={table?.players.sort().slice(0, 3)}
                />

                {isGameActive ?
                    <GameTable>
                        <Button
                            text='Раскрыть карты'
                            styleType='secondary'
                            className='game-table__reveal'
                            onClick={() => showdown(tableId)}
                        />
                    </GameTable>
                    :
                    <GameTable>
                        <div className='game-page__new-game-container'>
                            <Title text={votingResults ? votingResults.averageRating : table?.games[0].averageRating} />
                            <Button
                                text='Новая игра'
                                styleType='secondary'
                                onClick={() => newGame(tableId)}
                            />
                        </div>
                    </GameTable>
                }

                <PlayerCardList
                    className='game-page__bottom-player-list'
                    players={table?.players.sort().slice(3, 6)}
                    isUserPhotoAtBottom={true}
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