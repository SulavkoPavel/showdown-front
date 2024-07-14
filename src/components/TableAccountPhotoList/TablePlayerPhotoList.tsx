import './table-player-photo-list.css'
import stubTableAccountPhoto from '../../assets/Images/stub-table-account-photo.png'
import React from 'react';
import TableStubPlayerPhoto from '../TableStubPlayerPhoto/TableStubPlayerPhoto.tsx';

interface Props {
    users: User[];
}

const TablePlayerPhotoList = ({users}: Props) => {
    return (
        <div className='table-player-photo-list'>
            {users.slice(0, 5).map(user =>
                    <img
                        src={stubTableAccountPhoto}
                        className='table-account-photo'
                    />
                )
            }
            {Array.from({ length: 5 - users.length }, () => <TableStubPlayerPhoto />)}
        </div>
    )
}

export default TablePlayerPhotoList