import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useRef} from 'react';

import Lottie from 'react-lottie';

import animationData from './assets/lottie/78259-loading.json';
import api from './api';



function App() {

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('username'));

  const carImgField = useRef();

  const [carBrand, setCarBrand] = useState('');
  const [carName, setCarName] = useState('');
  const [carPrice, setCarPrice] = useState('');
  const [carYear, setCarYear] = useState('');
  

  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cadastro, setCadastro] = useState(true);
  const [year, setYear] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const getCars = async () => {


    setCarros([]);
    setLoading(true);
    const ano = document.getElementById('ano').value;

    // Requisicao com arquivo separado
    let { data: {cars, error} } = await api.getCarList(ano);

    // Requisicao com axios
    //let { data: {cars, error} } = await api.api.get(`/carros?ano=${ano}`);    
    if ( error !== ''){     
      alert(error);
      return;
    }

    // Requisicao com fetch
    // let url = 'https://api.b7web.com.br/carros/api/carros';
    // if ( ano !== ''){
    //   url += `?ano=${ano}`;
    // }
    // const cars = await fetch(url)
    //               .then( response => response.json() )
    //               .then( data => {
    //                 if ( data.error === ''){
    //                   return data.cars
    //                 } else {
    //                   alert(data.error);
    //                 }
    //               })

    console.log(cars);    
    setCarros(cars);
    setLoading(false);              
  }

  const google = () => {
    fetch('https://www.google.com.br')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); //pra não faxer o envio do formulário
    let url = '';
    let body = {};
    let json = {};
    if (cadastro) {

      // Requisicao com arquivo separado    
      body = {
        email: email,
        password: senha
      }

      // Requisicao com arquivo separado
      let result = await api.login(body);

      // Com fetch
      // url = 'https://api.b7web.com.br/carros/api/auth/login';
      
      console.log(-1);
      
      // Com axios
      // let result = await api.post('/auth/login',body)
      //console.log(0);
      json = result.data;
      //console.log('jsonnn ', json );
      
    } else {

      body = {
        name: nome,
        email: email,
        password: senha
      }

      // Requisicao com arquivo separado
      let result = await api.register(body);

      // Com fetch
      // url = 'https://api.b7web.com.br/carros/api/auth/register';      

      // Com axios
      //let result = await api.post('/auth/register',body)

      json = result.data;
    }

    // Com fetch
    // console.log('body', body);
    // let result = await fetch(url,{
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // json = await result.json();
    console.log(1);
    
    if ( json.error === ''){
      console.log(2);
      
      if(cadastro){
        console.log(3);
        
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.user.name);
        setToken(json.token);
        setUserName(json.user.name);
      }else{
        console.log(4);
        
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.user.name);
        setToken(json.token);
        setUserName(json.user.name);
      }
    } else {
      console.log(5);
            
      console.log('Error: ', json.error);
    }
    // console.log('RESULT', json);
  }

  const handleCadastro = (e) => {
    if (e.target.value === 'Login') {
      setCadastro(true);
    } else {
      setCadastro(false);
    }
  }

  const handleLogout = () => {
    setToken('');
    setUserName('');
    localStorage.setItem('token', '');
    localStorage.setItem('username', '');
  }

  const handleAddCarSubmit = async(e) => {
    e.preventDefault();

    let body = new FormData();
    body.append('brand', carBrand);
    body.append('name', carName);
    body.append('price', carPrice);
    body.append('year', carYear);

    if (carImgField.current.files.length > 0) {
      body.append('photo', carImgField.current.files[0]);
    }

    // Requisicao com arquivo separado
    let json = await api.addNewCar(body, token);
    
    //com axios
    //api.defaults.headers.Authorization = `Bearer ${token}`
    //let { data: json} = await api.post('/carro', body);

    // com fetch
    // let result = await fetch('https://api.b7web.com.br/carros/api/carro', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body
    // });

    // let json = await result.json()

    if (json.error){
      console.log('Errorrr: ',json.error);
    } else {
      alert('Carro adicionado com sucesso!!!');
      console.log('RESULT', json);      
      getCars();
      setCarBrand('');
      setCarName('');
      setCarYear('');
      setCarPrice('');
    }
  }

  useEffect(() => {
    getCars();
    //google();    
  }, [])
  

  return (
    <>
      { !token &&
        <div>
          <input type='radio' value='Login' name='cadastro' checked={cadastro} onClick={handleCadastro} />Login<br/>
          <input type='radio' value='Signup' name='cadastro' checked={!cadastro} onClick={handleCadastro} />Cadastro<br/>
          <hr/>
          { cadastro &&
          <h2>Faça Login</h2>
          }
          { !cadastro &&
            <h2>Faça Cadastro</h2>
          }
          <form onSubmit={handleLoginSubmit}>
            { cadastro === false &&
            <>  
              <label>
                Nome
                <input type='text' name='name' onChange={(e) => setNome(e.target.value) } />
              </label>
              <br/>
            </>
            }
            <label>
              E-mail
              <input type='email' name='email' onChange={(e) => setEmail(e.target.value) } />
            </label>
            <br/>
            <label>
              Senha
              <input type='password' name='password' onChange={(e) => setSenha(e.target.value) } />
            </label>
            <br/>
            <input type='submit' value='Enviar'/>
          </form>
        </div>
      }
      { token &&
        <div>
          <h3>Olá, {userName}</h3>
          <button onClick={handleLogout}>Sair</button>
          <form onSubmit={handleAddCarSubmit}>
            <label>
              Marca do carro 
              <input type='text' name='carbrand' value={carBrand} onChange={(e) => setCarBrand(e.target.value) } />
            </label>
            <br/>
           
            <label>
              Nome do carro
              <input type='text' name='carname' value={carName} onChange={(e) => setCarName(e.target.value) } />
            </label>
            <br/>
            <label>
              Ano do carro
              <input type='text' name='caryear' value={carYear} onChange={(e) => setCarYear(e.target.value) } />
            </label>
            <br/>
            <label>
              Preço do carro
              <input type='text' name='carprice' value={carPrice} onChange={(e) => setCarPrice(e.target.value) } />
            </label>
            <br/>
            <label>
              Foto do carro
              <input ref={carImgField} type='file' name='carimg'   />

            </label>
            <br/>
            <input type='submit' value='Enviar'/>
          </form>
        </div>
      }
      <hr/>

      <h1>Lista de Carros</h1>
      <select id='ano' onChange={getCars} >
        <option value=''></option>
        <option>2021</option>
        <option>2020</option>
        <option>2019</option>
        <option>2018</option>
        <option>2017</option>
        <option>2016</option>
        <option>2015</option>
        <option>2014</option>        
        <option>2013</option>
        <option>2012</option>
        <option>2011</option>
        <option>2010</option>
        <option>2009</option>
        <option>2008</option>        
      </select>
      <button onClick={()=>getCars()}>Atualizar Lista</button>
      <hr />
      {
        loading &&
        <Lottie options={defaultOptions} width='400px' />
      }
      { carros.length == 0 && loading === false &&
          <h2>Não há carros neste ano!!!</h2>
      }
      { carros.map( (item, index) => (
        <div key={index}>
          <img src={item.photo} />
          <h3>{item.brand} - {item.name}</h3>
          <p>R$ {item.price}</p>
        </div>
      ) ) }
      
    </>
  );
}

export default App;
