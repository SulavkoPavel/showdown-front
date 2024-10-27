import {Client, IMessage, StompConfig} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {TableView} from "./tables.ts";

let stompClient: Client;

export interface GameView {
    id: number;
    table: TableView;
    averageRating: number;
    showdown: boolean;
}

export interface VotingResult {
    userId: number;
    rating: number;
}

export interface VotingResults {
    votingResults: VotingResult[];
    averageRating: number;
    allVotedTheSame: boolean;
}

const onVoteHandlers: Array<(payload: IMessage) => void> = [];
const onGameHandlers: Array<(payload: IMessage) => void> = [];
const onVotingResultsHandlers: Array<(payload: IMessage) => void> = [];
const onPlayerActivitiesHandlers: Array<(payload: IMessage) => void> = [];


export function connectToWs(tableId: string) {
    const stompConfig: StompConfig = {
        webSocketFactory: () => new SockJS(import.meta.env.VITE_APP_API_HOST + "/ws"),
        onConnect: () => {
            stompClient.subscribe("/user/queue/" + tableId + "/votes", (payload) => {
                console.log(payload);
                onVoteHandlers.forEach(handler => handler(payload));
            });
            stompClient.subscribe("/user/queue/" + tableId + "/games", (payload) => {
                console.log(payload);
                onGameHandlers.forEach(handler => handler(payload));
            });
            stompClient.subscribe("/user/queue/" + tableId + "/voting-results", (payload) => {
                console.log(payload);
                onVotingResultsHandlers.forEach(handler => handler(payload));
            });
            stompClient.subscribe("/user/queue/" + tableId + "/player-activities", (payload) => {
                console.log(payload);
                onPlayerActivitiesHandlers.forEach(handler => handler(payload));
            });

            activeAtTable(tableId);
        },
        debug: (log: string) => {
            console.log(log);
        },
    };

    stompClient = new Client(stompConfig);

    stompClient.activate();
}

export function createVote(tableId: string, rating: number) {
    stompClient.publish({destination: `/app/table-votes/${tableId}/create`, body: JSON.stringify({rating: rating}) });
}

export function deleteVote(tableId: string, rating: number) {
    stompClient.publish({destination: `/app/table-votes/${tableId}/delete`, body: JSON.stringify({rating: rating}) });
}

export function addOnVoteHandler(handler: (payload: IMessage) => void) {
    onVoteHandlers.push(handler);
}

export function newGame(tableId: string) {
    stompClient.publish({destination: `/app/tables/${tableId}/create-game`});
}

export function activeAtTable(tableId: string) {
    stompClient.publish({destination: `/app/tables/${tableId}/active`});
}

export function addOnNewGameHandler(handler: (payload: IMessage) => void) {
    onGameHandlers.push(handler);
}

export function addOnVotingResultsHandler(handler: (payload: IMessage) => void) {
    onVotingResultsHandlers.push(handler);
}

export function addOnPlayerActivityHandler(handler: (payload: IMessage) => void) {
    onPlayerActivitiesHandlers.push(handler);
}

export function showdown(tableId: string) {
    stompClient.publish({destination: `/app/tables/${tableId}/showdown`});
}