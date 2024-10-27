import './table-list.css'
import {TableView} from '../../api/tables.ts';
import TableComponent from '../Table/TableComponent.tsx';

interface Props {
    tables: TableView[];
}

const TableList = ({tables}: Props) => {
    return (
        <div className='table-list'>
            {
                tables.sort().map(table =>
                    <TableComponent table={table} />
                )
            }
        </div>
    )
}

export default TableList