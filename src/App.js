import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FormPage from './pages/FormPage';
import ContactsPage from './pages/ContactsPage';
import Menu from './components/Menu';
import UserPage from './pages/UserPage';
import ErrorPage from './pages/ErrorPage';

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    if (localStorage.getItem('users')) {
      setData(JSON.parse(localStorage.getItem('users')));
    }
    else {
      fetch(' https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setData(data))
    }
  }, [])

  const handleNewUser = (user) => {
    let updatedData = [...data, user];
    setData(updatedData);
    saveDataToLocalStorage(updatedData);
  }
  const handleEditUser = (editUser) => {
    const { id, name, phone } = editUser;

    const updatedContacts = data.map(user => {
      if (user.id === parseInt(id)) {
        return { ...user, name: name, phone: phone }
      }
      else {
        return user
      }
    })
    console.log(updatedContacts);
    setData(updatedContacts);
    saveDataToLocalStorage(updatedContacts);

  }
  const handlerDelete = (id) => {
    let filterData = data.filter(user => user.id !== id)
    setData(filterData);
    saveDataToLocalStorage(filterData);
  }
  const saveDataToLocalStorage = (dataUsers) => {
    localStorage.setItem('users', JSON.stringify(dataUsers));
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<ContactsPage users={data} handleDeleteUser={handlerDelete} />} />
          <Route path="/form" element={<FormPage addNewUser={handleNewUser} />} />
          <Route path="/:idcontact" element={<UserPage editUser={handleEditUser} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
