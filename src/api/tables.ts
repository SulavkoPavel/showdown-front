import api from './api.ts';
import {GameView} from "./game.ts";
import {User} from "./users.ts";

export interface TableView {
    id: string;
    name: string;
    votingSystem: string;
    owner: User;
    isCurrentUserOwner: boolean;
    players: User[];
    activePlayers: User[];
    games: GameView[];
}

export interface TableCreateUpdate {
    name: string;
    votingSystem: string;
}

export async function getMyTables(): Promise<TableView[]> {
    return (await api.get('/api/my-tables')).data;
}

export async function getTable(tableId: string): Promise<TableView> {
    return (await api.get('/api/tables/' + tableId)).data;
}

export async function createTable(table: TableCreateUpdate): Promise<TableView> {
    return (await api.post('/api/tables', table)).data;
}

export async function updateTable(tableId: string, updatedTable: TableCreateUpdate): Promise<TableView> {
    return (await api.put('/api/tables/' + tableId, updatedTable)).data;
}

export async function deleteTable(tableId: string): Promise<void> {
    return (await api.delete('/api/tables/' + tableId)).data;
}