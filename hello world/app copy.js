// Incluindo Bibliotecas
const http = require('http');
const url = require('url');
const queryString = require('query-string');

// Definção de endereço/ URL
const hostname = '127.0.0.1';//LocalHost
const port = 2000;

// Implementação da regra de negócio
const server = http.createServer((req, res) => {


  // Pegar a pergunta na url
  const params = queryString.parse(url.parse(req.url, true).search);
  
  // Verificar a pergunta e escolher uma resposta
  let resposta = '';
  if(params.value === 'melhor-tecnologia'){
    resposta = 'Node.js, nao tem pra ninguem!!!';
    res.statusCode = 200;
  }else if(params.value === 'melhor-desenvolvedor'){
    resposta ='Guilherme E Bublitz';
    res.statusCode = 200;
  }else{
    resposta = 'Sla, Nem sei se esta url esxiste seu boco';
    res.statusCode = 404;
  }

  // Retornar a resposta escolhida
  
  res.setHeader('Content-Type', 'text/plain');
  if(res.statusCode != 404){
  res.end(resposta);
  }else{
    res.end('Url nao encontrada, desculpe :(');
  }
});


//Execução
server.listen(port, hostname, () => {
  console.log(`Ta rodando bemqui ó http://${hostname}:${port}/`);
});