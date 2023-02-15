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


  const handleSwitch = (page) => {
    setCurrentPage(page);
  }
  const handleNewUser = (user) => {
    let updatedData = [...data, user];
    setData(updatedData);
    localStorage.setItem('users', JSON.stringify(updatedData))
  }
  const handlerDelete = (id) => {
    let filterData = data.filter(user => user.id !== id)
    setData(filterData);
    localStorage.setItem('users', JSON.stringify(filterData));
  }

  return (
    <div className="App">
      <div className='container'>
        <header className='header'>
          <input type='button' value='Contacts' onClick={(e) => handleSwitch(e.target.value)} />
          <input type='button' value='Form' onClick={(e) => handleSwitch(e.target.value)} />
        </header>

        {currentPage === 'Contacts' ?
          <Contacts users={data} onClick={handlerDelete} /> :
          <Form onClick={handleNewUser} onNavigate={handleSwitch} />}

      </div>
    </div>
  );
}

export default App;
