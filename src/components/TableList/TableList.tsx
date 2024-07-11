import './table-list.css'
import React from 'react';
import {TableCreate} from '../../api/tables.ts';
import TableComponent from '../Table/TableComponent.tsx';

interface Props {
    tables: TableCreate[];
}

const TableList = ({tables}: Props) => {
    return (
        <div className='table-list'>
            {
                tables.map(table =>
                    <TableComponent table={table} />
                )
            }
        </div>
    )
}

export default TableList