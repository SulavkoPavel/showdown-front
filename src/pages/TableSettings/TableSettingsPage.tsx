import {useEffect, useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import {deleteTable, getTable, updateTable} from "../../api/tables.ts";
import Title from "../../components/Title/Title.tsx";
import './__title-container/table-settings-page__title-container.css'
import './__form/table-settings-page__delete-button.css'
import './__delete-button/table-settings-page__delete-button.css'
import TextField from "../../components/TextField/TextField.tsx";
import Button from "../../components/Button/Button.tsx";
import {useNavigate, useParams} from "react-router-dom";

const VOTING_SYSTEM_MASK = /^(\d{1,3}( \d{1,3})* ?|\s*)$/;

const TableSettingsPage = () => {
    const {tableId} = useParams<{ tableId: string }>();
    const navigate = useNavigate();
    const [tableName, setTableName] = useState('');
    const [tableVotingSystem, setTableVotingSystem] = useState('');

    useEffect(() => {
        getTable(tableId!).then(table => {
            setTableName(table.name)
            setTableVotingSystem(table.votingSystem)
        });
    }, []);

    return (
        <div className="table-settings-page">
            <CommonHeader/>
            <div className='table-settings-page__title-container'>
                <Title text='Настройки стола'/>
            </div>
            <div className='table-settings-page__form'>
                <TextField
                    label='Имя стола'
                    placeholder='UpdatedName'
                    value={tableName}
                    onValueChange={setTableName}
                    styleStatus='default'
                />
                <TextField
                    label='Система голосования'
                    placeholder='1 2 3 5 8 13 20 40 100'
                    value={tableVotingSystem}
                    onValueChange={setTableVotingSystem}
                    styleStatus='default'
                    mask={VOTING_SYSTEM_MASK}
                />
                <Button
                    text='Сохранить'
                    onClick={() => updateTable(tableId!, {name: tableName, votingSystem: tableVotingSystem})
                        .then(() => navigate('/my-tables'))}
                />
            </div>
            <Button
                text='Удалить'
                styleType='secondary'
                color='red'
                className='table-settings-page__delete-button'
                onClick={() => deleteTable(tableId!)
                    .then(() => navigate('/my-tables'))
                }
            />
        </div>
    );
}

export default TableSettingsPage