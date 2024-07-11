import React, {useEffect, useState} from 'react'
import CommonHeader from "../../components/CommonHeader/CommonHeader.tsx";
import {getMyTables, TableCreate} from "../../api/tables.ts";
import TableList from "../../components/TableList/TableList.tsx";
import Title from "../../components/Title/Title.tsx";
import './__title-container/my-tables-page__title-container.css'
import Button from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

const MyTablesPage = () => {
    const navigate = useNavigate();
    const [tables, setTables] = useState<TableCreate[]>([]);

    useEffect(() => {
        getMyTables().then(tables => setTables(tables));
    }, []);

    return (
        <div className="my-tables-page">
            <CommonHeader/>
            <div className='my-tables-page__title-container'>
                <Title text='Мои столы' />
                <Button
                    text='Создать стол'
                    styleType='secondary'
                    onClick={() => navigate('/create-table')}
                />
            </div>
            <TableList tables={tables} />
        </div>
    );
}

export default MyTablesPage