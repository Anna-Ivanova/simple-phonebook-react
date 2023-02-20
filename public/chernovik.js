import React from "react";
import { useRef, useState } from "react";
import '../components/Form.scss'
import { useNavigate } from "react-router-dom";
import { validateName, validateSurname, validatePhone } from '../helpers/Validation'

export default function FormPage({ addNewUser }) {

    const inputName = useRef('');
    const inputSurname = useRef('');
    const inputPhone = useRef('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const saveForm = () => {
        setErrors([]);
        let name = inputName.current.value;
        let surname = inputSurname.current.value;
        let phone = inputPhone.current.value;
        const isNameValid = validateName(name);
        const isSurnameValid = validateSurname(surname);
        const isPhoneValid = validatePhone(phone);
        const newErrors = [];
        if (!isNameValid) {
            newErrors.push('Pls input correct name');
        }

        if (!isSurnameValid) {
            newErrors.push('Pls input correct surname');
        }

        if (!isPhoneValid) {
            newErrors.push('Phone number format 0505555555');
        }

        const hasErrors = newErrors.length > 0;

        if (!hasErrors) {
            const dataUser = {
                id: Date.now(),
                name: `${name} ${surname}`,
                phone: phone
            }
            addNewUser(dataUser);
            setErrors([]);
            navigate("/")
        } else {
            setErrors(newErrors);
        }
    }

    const cancelForm = () => {
        navigate("/")
    }

    return (
        <form className="form">
            <h2>Add new contact</h2>
            <div className="form-inputs">
                <input ref={inputName} type='text' placeholder="Pls input name" name='name' />
                {errors.includes('Pls input correct name') && <div style={{ color: 'red' }}>Pls input correct name</div>}
                <input ref={inputSurname} type='text' name='surname' placeholder="Pls input surname" />
                {errors.includes('Pls input correct surname') && <div style={{ color: 'red' }}>Pls input correct surname</div>}
                <input ref={inputPhone} type='text' name='phone' placeholder="Pls input phonenumber" />
                {errors.includes('Phone number format 0505555555') && <div style={{ color: 'red' }}>Phone number format 0505555555</div>}
            </div>
            <div className="form-buttons">
                <input type='button' value="Save" onClick={saveForm} />
                <input type='button' value="Cancel" onClick={cancelForm} />
            </div>
        </form>
    );
}

const inputName = useRef('');
const inputSurname = useRef('');
const inputPhone = useRef('');
const [errors, setErrors] = useState({});
const navigate = useNavigate();

const saveForm = () => {
    setErrors({});
    let name = inputName.current.value;
    let surname = inputSurname.current.value;
    let phone = inputPhone.current.value;
    const isNameValid = validateName(name);
    const isSurnameValid = validateSurname(surname);
    const isPhoneValid = validatePhone(phone);
    if (!isNameValid) {
        setErrors(prevErrors => ({ ...prevErrors, errorName: 'Pls input correct name' }));
    }
    if (!isSurnameValid) {
        setErrors(prevErrors => ({ ...prevErrors, errorSurname: 'Pls input correct surname' }))
    }
    console.log(errors)
    if (!isPhoneValid) {
        setErrors(prevErrors => ({ ...prevErrors, errorPhone: 'Phone number format 0505555555' }))
    }
    //isNameValid && isNameValid && inputPhone
    else if (Object.keys(errors).length === 0) {
        const dataUser = {
            id: Date.now(),
            name: `${name} ${surname}`,
            phone: phone
        }
        addNewUser(dataUser);
        setErrors({});
        navigate("/")
    }
}

const cancelForm = () => {
    navigate("/")
}
return (
    <form className="form">
        <h2>Add new contact</h2>
        <div className="form-inputs">
            <input ref={inputName} type='text' placeholder="Pls input name" name='name' />
            {errors && <div style={{ color: 'red' }}>{errors.errorName}</div>}
            <input ref={inputSurname} type='text' name='surname' placeholder="Pls input surname" />
            {errors && <div style={{ color: 'red' }}>{errors.errorSurname}</div>}
            <input ref={inputPhone} type='text' name='phone' placeholder="Pls input phonenumber" />
        </div>
        {errors && <div style={{ color: 'red' }}>{errors.errorPhone}</div>}
        <div className="form-buttons">
            <input type='button' value="Save" onClick={saveForm} />
            <input type='button' value="Cancel" onClick={cancelForm} />
        </div>
    </form>
);
}