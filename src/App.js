
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //objeto produto
  const produto = {
    codigo: 0,
    nome:'',
    marca : ''

  }

  //usestate
const [btnCadastrar, setBtnCadastrar] = useState(true);
const [produtos, setProdutos] = useState([]);
const [objProduto, setObjProduto] = useState(produto);

//useEffect hook executado quando componetne é montado
useEffect(() =>{

  fetch("http://localhost:8080/listar")
  .then(retorno => retorno.json())
  .then(retorno_convertido => setProdutos(retorno_convertido));

}, []);

//obtendo os dados do formulario
const aoDigitar = (e) => {

  setObjProduto({...objProduto, [e.target.name] : e.target.value});
}

//cadastrar produto
const cadastrar = () => {
  fetch('http://localhost:8080/cadastrar', {
    method:'post',
    body:JSON.stringify(objProduto),
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json'
    }
  })
//promisse
  .then(retorno => retorno.json())
  .then(retorno_convertido => {
    console.log(retorno_convertido);
  })
}


  return (
    <div >
      
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar}/>
      <Tabela vetor={produtos}/>
    </div>
  );
}

export default App;
