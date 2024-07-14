import api from './api.ts';
import {GameView} from "./game.ts";

export interface TableView {
    id: string;
    name: string;
    votingSystem: number[];
    owner: User;
    players: User[];
    games: GameView[];
}

export interface TableCreate {
    name: string;
}

export async function getMyTables(): Promise<TableView[]> {
    return (await api.get('/api/my-tables')).data;
}

export async function getTable(id: string): Promise<TableView> {
    return (await api.get('/api/tables/' + id)).data;
}

export async function createTable(table: TableCreate): Promise<TableView> {
    return (await api.post('/api/tables', table)).data;
}

export async function deleteTable(id: string): Promise<void> {
    return (await api.delete('/api/tables/' + id)).data;
}