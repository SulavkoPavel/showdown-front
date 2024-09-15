import './table-player-photo-list.css'
import stubTableAccountPhoto from '../../assets/Images/stub-table-account-photo.png'
import React from 'react';
import TableStubPlayerPhoto from '../TableStubPlayerPhoto/TableStubPlayerPhoto.tsx';
import TablePlayerProfilePhoto from "../TablePlayerProfilePhoto/TablePlayerProfilePhoto.tsx";
import {User} from "../../api/users.ts";

interface Props {
    users: User[];
}

const TablePlayerPhotoList = ({users}: Props) => {
    return (
        <div className='table-player-photo-list'>
            {users.slice(0, 5).map(user =>
                    <TablePlayerProfilePhoto
                        userId={user.id}
                    />
                )
            }
            {Array.from({ length: 5 - users.length }, () => <TableStubPlayerPhoto />)}
        </div>
    )
}

export default TablePlayerPhotoList