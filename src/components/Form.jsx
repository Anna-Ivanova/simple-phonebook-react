import React from "react";
import { useRef, useState } from "react";
import './Form.scss'


export default function Form({ onClick, onNavigate }) {

    const inputName = useRef('');
    const inputSurname = useRef('');
    const inputPhone = useRef('');
    const [error, setError] = useState('');
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
    const saveForm = () => {

        let name = inputName.current.value;
        let surname = inputSurname.current.value;
        let phone = inputPhone.current.value;
        if (validateForm(name, surname, phone)) {
            const dataUser = {
                id: Date.now(),
                name: `${name} ${surname}`,
                phone: phone
            }
            onClick(dataUser);
            onNavigate('Contacts')
        }
    }

    const cancelForm = () => {
        onNavigate('Contacts')
    }

    return (
        <form className="form">
            <h2>Add new contact</h2>
            <div className="form-inputs">
                <input ref={inputName} type='text' placeholder="Pls input name" name='name' />
                <input ref={inputSurname} type='text' name='surname' placeholder="Pls input surname" />
                <input ref={inputPhone} type='text' name='phone' placeholder="Pls input phonenumber" />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className="form-buttons">
                <input type='button' value="Save" onClick={saveForm} />
                <input type='button' value="Cancel" onClick={cancelForm} />
            </div>
        </form>
    );
}