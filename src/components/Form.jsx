import React from "react";
import { useRef } from "react";
import './Form.scss'


export default function Form({ onClick, onNavigate }) {

    const inputName = useRef('');
    const inputSurname = useRef('');
    const inputPhone = useRef('');
    const saveForm = () => {

        const dataUser = {
            id: Date.now(),
            name: `${inputName.current.value} ${inputSurname.current.value}`,
            phone: inputPhone.current.value
        }

        onClick(dataUser);
        onNavigate('Contacts')

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
            <div className="form-buttons">
                <input type='button' value="Save" onClick={saveForm} />
                <input type='button' value="Cancel" onClick={cancelForm} />
            </div>
        </form>
    );
}