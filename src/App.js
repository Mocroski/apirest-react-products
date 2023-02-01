
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
    if(retorno_convertido.mensagem !== undefined){
      alert(retorno_convertido.mensagem);
    } else{
      setProdutos([...produtos, retorno_convertido]);
      alert('Produto cadastrado com sucesso!');
      limparFormulario();
    }
  })
}

//remover produto
const remover = () => {
  fetch('http://localhost:8080/remover/'+objProduto.codigo, {
    method:'delete',
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json'
    }
  })
//promisse
  .then(retorno => retorno.json())
  .then(retorno_convertido => {
    
    //mrensagem
    alert(retorno_convertido.mensagem);

    //copia do vetor de produtos
    let vetorTemp = [...produtos];

    //preciso saber qual a posicao do produto que preciso remover por isso o indice
    let indice = vetorTemp.findIndex((p) => { //parametro que vai ter acesso ao obj produto
        return p.codigo === objProduto.codigo; //3 sinais de igual é uma  boa pratica do react
    }); //metodo nativo do js que percorre o vetor e retorna a posicao de uma verificacao

    //remover produto do vetortemporario
    vetorTemp.splice(indice, 1);

    //atualizar o vetor de produtos
    setProdutos(vetorTemp);

    //limpar formulario
    limparFormulario();
  })
}

//limpar formulario
const limparFormulario = () => {
  setObjProduto(produto);
  setBtnCadastrar(true);
}

//selecionar produto
const selecionarProduto = (indice) => {
  setObjProduto(produtos[indice]);
  setBtnCadastrar(false);
}


  return (
    <div >
      
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} remover={remover} />
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
