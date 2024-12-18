import {useEffect, useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import {useParams} from "react-router-dom";
import {getTable, TableView} from "../../api/tables.ts";
import VotingCardList from "../../components/VotingCardList/VotingCardList.tsx";
import {
    addOnNewGameHandler,
    addOnPlayerActivityHandler,
    addOnVoteHandler,
    addOnVotingResultsHandler,
    connectToWs,
    createVote,
    deleteVote,
    newGame,
    showdown, VotingResults
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
import {User} from "../../api/users.ts";
import LoadingPage from "../LoadingPage/LoadingPage.tsx";
import GameResizableContainer from "../../components/GameResizableContainer/GameResizableContainer.tsx";
import ReactConfetti from "react-confetti";
import useWindowDimensions from "../../hooks/useWindowDimensions.ts";

const GamePage = () => {
    const {tableId} = useParams<{ tableId: string }>();
    const [table, setTable] = useState<TableView>();
    const [activePlayers, setActivePlayers] = useState<User[]>([]);
    const [isShowdown, setIsShowdown] = useState(false);
    const [votingResults, setVotingResults] = useState<VotingResults>();
    const [showConfetti, setShowConfetti] = useState(false);
    const [votedUserIds, setVotedUserIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        setIsLoading(true);
        getTable(tableId!).then(table => {
            setIsLoading(false);
            setTable(table);
            setActivePlayers(table.activePlayers)
            setIsShowdown(table.games[0].showdown);
            table.players.sort((a, b) => a.id - b.id);
            connectToWs(tableId!);

            addOnNewGameHandler(() => {
                setIsShowdown(false);
                setVotedUserIds([]);
                setShowConfetti(false);
            });
            addOnVotingResultsHandler(payload => {
                setIsShowdown(true);
                setVotingResults(JSON.parse(payload.body));
                setShowConfetti(JSON.parse(payload.body)?.allVotedTheSame);
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
        <>
            {
                showConfetti &&
                <ReactConfetti
                    wind={0.05}
                    tweenDuration={7000}
                    width={width}
                    height={height}
                    numberOfPieces={1000}
                    initialVelocityY={25}
                    initialVelocityX={25}
                    gravity={0.1}
                    confettiSource={{
                        x: width / 2 - 100,
                        y: height / 2 - 100,
                        w: 200,
                        h: 200,
                    }}
                    recycle={false}
                    colors={['#9CACFF', '#FFEAA1', '#FF9C9C']}
                />
            }
            <LoadingPage isLoading={isLoading}>
                <div className="game-page">
                    <CommonHeader
                        table={table}
                    />

                    <GameResizableContainer
                        centerElement={
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
                                            <Title
                                                text={votingResults ? votingResults.averageRating.toString() : table?.games[0]?.averageRating.toString()}
                                            />
                                            {table?.isCurrentUserOwner ?
                                                <Button
                                                    text='Новая игра'
                                                    styleType='secondary'
                                                    onClick={() => {
                                                        newGame(tableId!);
                                                    }}
                                                />
                                                :
                                                null
                                            }
                                        </div>
                                    </GameTable>
                                    :
                                    <GameTable>
                                        {table?.isCurrentUserOwner ?
                                            <Button
                                                text='Раскрыть карты'
                                                styleType='secondary'
                                                className='game-table__reveal'
                                                onClick={() => {
                                                    showdown(tableId!);
                                                }}
                                            />
                                            :
                                            null
                                        }
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
                        }
                        bottomElement={
                            <VotingCardList
                                className='game-page__voting-card-list'
                                disabled={isShowdown}
                                votingSystem={table?.votingSystem ? table.votingSystem.split(' ').map(Number) : []}
                                onSelect={voteValue => createVote(tableId!, voteValue)}
                                onUnselect={voteValue => deleteVote(tableId!, voteValue)}
                            />
                        }
                    />
                </div>
            </LoadingPage>
        </>
    );
}

export default GamePage