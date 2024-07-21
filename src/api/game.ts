import api from './api.ts';

import {Client, IMessage, StompConfig, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {getAccessTokenFromLocalStorage} from "./auth.ts";
import {messageCallbackType} from "@stomp/stompjs/src/types.ts";
import {TableView} from "./tables.ts";

let stompClient: Client;

export interface GameView {
    id: number;
    table: TableView;
    averageRating: number;
    showdown: boolean;
}


interface CreateVote {
    rating: string;
}

export interface VotingResult {
    userId: number;
    rating: number;
}

export interface VotingResults {
    votingResults: VotingResult[];
    averageRating: number;
}

const onVoteHandlers = [];
const onGameHandlers = [];
const onVotingResultsHandlers = [];
const onPlayerActivitiesHandlers = [];


export function connectToWs(tableId: string) {
    const stompConfig: StompConfig = {
        webSocketFactory: () => new SockJS(import.meta.env.VITE_APP_API_HOST + "/ws"),
        beforeConnect: function () {
            this.connectHeaders = {Authorization: "Bearer " + getAccessTokenFromLocalStorage()};
        },
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

export function createVote(tableId: number, rating: number) {
    stompClient.publish({destination: `/app/table-votes/${tableId}/create`, body: JSON.stringify({rating: rating}) });
}

export function deleteVote(tableId: number, rating: number) {
    stompClient.publish({destination: `/app/table-votes/${tableId}/delete`, body: JSON.stringify({rating: rating}) });
}

export function addOnVoteHandler(handler: (payload: IMessage) => void) {
    onVoteHandlers.push(handler);
}

export function newGame(tableId: number) {
    stompClient.publish({destination: `/app/tables/${tableId}/create-game`});
}

export function activeAtTable(tableId: number) {
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

export function showdown(tableId: number) {
    stompClient.publish({destination: `/app/tables/${tableId}/showdown`});
}