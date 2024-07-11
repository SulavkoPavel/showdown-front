import './table-participant-photo-list.css'
import stubTableAccountPhoto from '../../assets/Images/stub-table-account-photo.png'
import React from 'react';
import TableStubParticipantPhoto from '../TableStubParticipantPhoto/TableStubParticipantPhoto.tsx';

interface Props {
    users: User[];
}

const TableParticipantPhotoList = ({users}: Props) => {
    return (
        <div className='table-participant-photo-list'>
            {users.slice(0, 5).map(user =>
                    <img
                        src={stubTableAccountPhoto}
                        className='table-account-photo'
                    />
                )
            }
            {Array.from({ length: 5 - users.length }, () => <TableStubParticipantPhoto />)}
        </div>
    )
}

export default TableParticipantPhotoList