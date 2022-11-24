import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [userData, setData] = useState([])
  const [search, setSearch] = useState('')
  const getData = async () => {
    const res = await fetch('https://pim2.herokuapp.com/api/users')
    const data = await res.json()
    return setData(data)
  }

  useEffect(() => {
    getData()
  },[])

  useEffect(()=>{
    console.log({userData})
  },[userData])

  const getUser = () => {
    const filter = userData.filter((user:any) => user.username.toLowerCase().includes(search.toLowerCase()))
    if(!search){
      getData()
    }
    setData(filter)
  }

  return (
    <div>
      <h1>Lista de clientes LifeCare</h1>
      <div className='search'>
        <input type={'text'} placeholder='Busque por um nome ou sobrenome' onChange={(e)=> setSearch(e.target.value)}/>
        <button onClick={()=>getUser()}>Buscar</button>
      </div>
    <div className='container'>
      {userData && userData.map((user:any)=>(
        <div className='plan'>
          <p>Nome: {user.username ?? 'Não informado'}</p>
          <p>Salário: {user.clientSalary ?? 'Não informado'}</p>
          <p>Sexo: {user.clientSex?? 'Não informado'}</p>
          <p>Perfil Completo: {user.first_access?? 'Não informado'}</p>
          <p>Telefone: {user.clientPhone?? 'Não informado'}</p>
          <p>Dependentes: {user.clientDependents?? 'Não informado'}</p>
          <p>Nascimento: {user.clientBirthDate?? 'Não informado'}</p>
          <p>Formação: {user.clientDegree?? 'Não informado'}</p>
          <p>CPF: {user.clientIdentification?? 'Não informado'}</p>
          <p>Email: {user.email?? 'Não informado'}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
