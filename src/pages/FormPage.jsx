import React from "react";
import { useNavigate } from "react-router-dom";
import Form from '../components/Form';


export default function FormPage({ addNewUser }) {
    const navigate = useNavigate();

    const saveForm = (user) => {

        addNewUser(user);
        navigate("/")
    }
    return (
        <div>
            <h2>Add new contact</h2>
            <Form onSave={saveForm} />

        </div>
    );
}