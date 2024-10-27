import {useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import {createTable} from "../../api/tables.ts";
import Title from "../../components/Title/Title.tsx";
import './__title-container/create-table-page__title-container.css'
import './__form/create-table-page__form.css'
import TextField, {TextFieldProps} from "../../components/TextField/TextField.tsx";
import Button from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

const CreateTablePage = () => {
    const navigate = useNavigate();
    const [textFieldStatus, setTextFieldStatus] = useState<TextFieldProps['styleStatus']>('default');
    const [tableName, setTableName] = useState('');
    const [tableVotingSystem, setTableVotingSystem] = useState('');

    return (
        <div className="create-table-page">
            <CommonHeader/>
            <div className='create-table-page__title-container'>
                <Title text='Создать стол'/>
            </div>
            <div className='create-table-page__form'>
                <TextField
                    label='Имя стола'
                    placeholder='MyNewTable'
                    value={tableName}
                    onValueChange={setTableName}
                    styleStatus={textFieldStatus}
                />
                <TextField
                    label='Система голосования'
                    placeholder='1 2 3 5 8 13 20 40 100'
                    value={tableVotingSystem}
                    onValueChange={setTableVotingSystem}
                    styleStatus={textFieldStatus}
                    mask={/^(\d{1,3}( \d{1,3})* ?|\s*)$/}
                />
                <Button
                    text='Создать'
                    onClick={() => createTable({name: tableName, votingSystem: tableVotingSystem})
                        .then(() => navigate('/my-tables'))
                        .catch(() => setTextFieldStatus('error'))
                    }
                />
            </div>

        </div>
    );
}

export default CreateTablePage