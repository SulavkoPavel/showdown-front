import './table.css'
import {TableView} from '../../api/tables.ts';
import TablePlayerPhotoList from '../TableAccountPhotoList/TablePlayerPhotoList.tsx';
import TableName from '../TableName/TableName.tsx';
import Button from '../Button/Button.tsx';
import './__menu-buttons/table__menu-buttons.css';
import './__inner-container/table__inner-container.css';
import {useNavigate} from 'react-router-dom';

interface Props {
    table: TableView;
}

const TableComponent = ({table}: Props) => {
    const navigate = useNavigate();

    return (
        <div className='table'>
            <div className='table__menu-buttons'>
                <Button
                    text='Играть'
                    styleType='primary-small'
                    onClick={() => navigate(`/${table.id}`)}
                />
                <Button
                    text='Настроить'
                    styleType='secondary'
                    onClick={() => navigate(`/tables/${table.id}/settings`)}
                />
            </div>
            <div>
                <div className='table__inner-container'>
                    <TablePlayerPhotoList users={table.players}/>
                    <TableName name={table.name}/>
                </div>
            </div>
        </div>
    )
}

export default TableComponent