
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import('./Form.scss');

export default function Form({ dataUser = null, onEdit, onSave }) {
    console.log(dataUser);
    const navigate = useNavigate();
    const [editName, setEditName] = useState('');
    const [editSurname, setEditSurname] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (dataUser) {
            setEditName(dataUser.name.split(' ')[0]);
            setEditSurname(dataUser.name.split(' ')[1]);
            setEditPhone(dataUser.phone);
        }
    }, [dataUser]);

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
    const handleForm = () => {

        if (validateForm(editName, editSurname, editPhone)) {
            const formUser = {
                id: dataUser ? dataUser.id : Date.now(),
                name: `${editName} ${editSurname}`,
                phone: editPhone
            }
            dataUser ? onEdit(formUser) : onSave(formUser);
        }
    }
    const cancelForm = () => {
        navigate("/")
    }

    return (
        <form className="form">
            <div className="form-inputs">
                <input type='text' name='name' value={editName} onChange={handleNameChange} />
                <input type='text' name='surname' value={editSurname} onChange={handleSurnameChange} />
                <input type='text' name='phone' value={editPhone} onChange={handlePhoneChange} />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className="form-buttons">
                <input type='button' value={dataUser ? 'Edit' : 'Save'} onClick={handleForm} />
                <input type='button' value="Cancel" onClick={cancelForm} />
            </div>
        </form>
    )
}