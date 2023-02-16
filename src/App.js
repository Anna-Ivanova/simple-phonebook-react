import { useEffect, useState } from 'react'
import './App.css';
import Form from './components/Form';
import Contacts from './components/Contacts';

function App() {

  const [currentPage, setCurrentPage] = useState('Contacts');
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

  const handleButtonClick = (e) => {
    handleSwitch(e.target.value);
  }
  const handleSwitch = (page) => {
    setCurrentPage(page);
  }
  const handleNewUser = (user) => {
    let updatedData = [...data, user];
    setData(updatedData);
    saveDataToLocalStorage(updatedData);
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
      <div className='container'>
        <header className='header'>
          <input type='button' value='Contacts' onClick={handleButtonClick} />
          <input type='button' value='Form' onClick={handleButtonClick} />
        </header>

        {currentPage === 'Contacts' ?
          <Contacts users={data} handleDeleteUser={handlerDelete} /> :
          <Form onClick={handleNewUser} onNavigate={handleSwitch} />}

      </div>
    </div>
  );
}

export default App;
