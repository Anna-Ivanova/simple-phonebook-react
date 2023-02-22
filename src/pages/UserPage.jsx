import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

export default function UserPage({ saveEditUser }) {
    const params = useParams();
    const navigate = useNavigate();
    const [editUser, setEditUser] = useState('');

    useEffect(() => {
        if (localStorage.getItem('users')) {
            const users = JSON.parse(localStorage.getItem('users'))
            if (isNaN(params.idcontact)) {
                navigate('*');
                return;
            }
            const user = users.find(user => user.id === parseInt(params.idcontact));
            if (!user) {
                navigate('*');
            } else {
                setEditUser(user);
            }

        }
        else {
            fetch(` https://jsonplaceholder.typicode.com/users/${params.idcontact}`)
                .then(response => response.json())
                .then(user => {
                    if (!user.id) {
                        navigate('*');
                    }
                    setEditUser(user);
                })
        }
    }, [])


    const editForm = (user) => {

        saveEditUser(user);
        navigate("/")


    }

    return (
        <div>
            <h2>Edit contact</h2>
            <Form dataUser={editUser} onEdit={editForm} />
        </div>
    )
}