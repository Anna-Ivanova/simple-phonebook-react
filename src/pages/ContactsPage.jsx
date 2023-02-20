import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDelete from '../components/ModalDelete.jsx';
import('../components/Contacts.scss');

export default function ContactsPage({ users, handleDeleteUser }) {

    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState('');
    const handleShowModal = (e) => {
        const idToDelete = parseInt(e.target.id);
        const user = users.find(user => user.id === idToDelete);
        setUserToDelete(user);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setUserToDelete('');
    };
    const handleDelete = () => {

        handleDeleteUser(userToDelete.id);
        setShowModal(false);
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {users.map(user =>
                    <tr id={user.id} key={user.id}>
                        <td value={user.name}>{(user.name).split(' ')[0]}</td>
                        <td>{(user.name).split(' ')[1]}</td>
                        <td>{user.phone}</td>
                        <td><input className="btn btn-danger" id={user.id} type='button' value='Delete' onClick={handleShowModal} />
                            <Link className="edit btn btn-info" to={`/${user.id}`}>Edit</Link>
                        </td>
                    </tr>)}

            </tbody>
            <ModalDelete show={showModal}
                handleClose={handleCloseModal}
                user={userToDelete}
                handleDelete={handleDelete} />
        </table >

    );
}