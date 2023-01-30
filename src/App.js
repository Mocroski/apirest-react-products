
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //usestate
const [btnCadastrar, setBtnCadastrar] = useState(true);
const [produtos, setProdutos] = useState([]);

//useEffect hook executado quando componetne é montado
useEffect(() =>{

  fetch("http://localhost:8080/listar")
  .then(retorno => retorno.json())
  .then(retorno_convertido => setProdutos(retorno_convertido));

}, []);


  return (
    <div >
      
      <Formulario botao={btnCadastrar}/>
      <Tabela vetor={produtos}/>
    </div>
  );
}

export default App;
