import api from './api.ts';

import {Client, IMessage, StompConfig, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {getAccessTokenFromLocalStorage} from "./auth.ts";
import {messageCallbackType} from "@stomp/stompjs/src/types.ts";

let stompClient: Client;

interface CreateVote {
    voteValue: string;
}

interface VotingResult {
    userId: number;
    vote: number;
}

interface VotingResults {
    votingResults: VotingResult[];
    averageRating: number;
}

const onVoteHandlers = [];
const onGameHandlers = [];
const onShowdownHandlers = [];


export function connectToWs() {
    const stompConfig: StompConfig = {
        webSocketFactory: () => new SockJS(import.meta.env.VITE_APP_API_HOST + "/ws"),
        beforeConnect: function () {
            this.connectHeaders = {Authorization: "Bearer " + getAccessTokenFromLocalStorage()};
        },
        onConnect: () => {
            stompClient.subscribe("/user/queue/votes", (payload) => {
                console.log(payload);
                onVoteHandlers.forEach(handler => handler(payload));
            });
            stompClient.subscribe("/user/queue/games", (payload) => {
                console.log(payload);
                onGameHandlers.forEach(handler => handler(payload));
            });
            stompClient.subscribe("/user/queue/showdown", (payload) => {
                console.log(payload);
                onShowdownHandlers.forEach(handler => handler(payload));
            });
        },
        debug: (log: string) => {
            console.log(log);
        },
    };

    stompClient = new Client(stompConfig);

    stompClient.activate();
}

export function createVote(tableId: number, voteValue: number) {
    stompClient.publish({destination: `/app/table-votes/${tableId}/create`, body: JSON.stringify({voteValue: voteValue}) });
}

export function deleteVote(tableId: number, voteValue: number) {
    stompClient.publish({destination: `/app/table-votes/${tableId}/delete`, body: JSON.stringify({voteValue: voteValue}) });
}

export function addOnVoteHandler(handler: (payload: IMessage) => void) {
    onVoteHandlers.push(handler);
}

export function newGame(tableId: number) {
    stompClient.publish({destination: `/app/tables/${tableId}/create-game`});
}

export function addOnNewGameHandler(handler: (payload: IMessage) => void) {
    onGameHandlers.push(handler);
}

export function showdown(tableId: number) {
    stompClient.publish({destination: `/app/tables/${tableId}/showdown`});
}

export function addOnShowdownHandler(handler: (payload: IMessage) => void) {
    onShowdownHandlers.push(handler);
}