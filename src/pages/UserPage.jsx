import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function UserPage({ editUser }) {
    const params = useParams();
    const navigate = useNavigate();
    const [editName, setEditName] = useState('');
    const [editSurname, setEditSurname] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [error, setError] = useState('');
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
                setEditName((user.name).split(' ')[0]);
                setEditSurname((user.name).split(' ')[1])
                setEditPhone(user.phone);
            }

        }
        else {
            fetch(` https://jsonplaceholder.typicode.com/users/${params.idcontact}`)
                .then(response => response.json())
                .then(user => {
                    if (!user.id) {
                        navigate('*');
                    }
                    setEditName((user.name).split(' ')[0])
                    setEditSurname((user.name).split(' ')[1])
                    setEditPhone(user.phone)
                })
        }
    }, [])

    const validateForm = (name, surname, phone) => {
        const regName = /^[A-Z][a-z]{3,}$/;
        const regPhone = /^\d{10}$/;

        if (!regName.test(name)) {
            setError('Pls input correct name')
            return false;
        }
        else if (!regName.test(surname)) {
            setError('Pls input correct surname');
            return false;
        }
        else if (!regPhone.test(phone)) {
            setError('Phone number format 0505555555')
            return false;
        }
        else {
            return true;
        }
    }

    const handleNameChange = (e) => {
        setEditName(e.target.value);
    }
    const handleSurnameChange = (e) => {
        setEditSurname(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setEditPhone(e.target.value);
    }
    const editForm = () => {
        if (validateForm(editName, editSurname, editPhone)) {
            const dataUser = {
                id: params.idcontact,
                name: `${editName} ${editSurname}`,
                phone: editPhone
            }
            editUser(dataUser);
            navigate("/")
        }

    }
    const cancelForm = () => {
        navigate("/")
    }

    return (
        <form className="form">
            <h2>Edit User Data</h2>
            <div className="form-inputs">
                <input type='text' name='name' value={editName} onChange={handleNameChange} />
                <input type='text' name='surname' value={editSurname} onChange={handleSurnameChange} />
                <input type='text' name='phone' value={editPhone} onChange={handlePhoneChange} />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className="form-buttons">
                <input type='button' value="Edit" onClick={editForm} />
                <input type='button' value="Cancel" onClick={cancelForm} />
            </div>
        </form>
    )
}