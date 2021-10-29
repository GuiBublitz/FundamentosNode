// Incluindo Bibliotecas
const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

// Definção de endereço/ URL
const hostname = '127.0.0.1'; // LocalHost
const port = 3000;

// Implementação da regra de negócio
const server = http.createServer((req, res) => {

  var resposta;
  const urlparse= url.parse(req.url, true);
  const params = queryString.parse(urlparse.search);//Receber informações do usuário

  //Criar um usuário / Atualizar um usuário
  if(urlparse.pathname == '/criar-usuario'){
     //Salvar informações do usuário
     fs.writeFile(`users/${params.id}.txt`, JSON.stringify(params), err => {
       if (err) throw err;
       
       res.setHeader('Content-Type', 'text/plain');
       res.statusCode = 200;
       res.end(resposta);
     });
     resposta = `Usuario criado com sucesso!! :)`;
  }
  //Selecionar um usuário
  else if(urlparse.pathname == '/selecionar-usuario'){
    fs.readFile(`users/${params.id}.txt`, (err, data) => {
      resposta = data;

      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(resposta);
    });
  }
  //Remover o usuário
  else if(urlparse.pathname == '/deletar-usuario'){
    fs.unlink(`users/${params.id}.txt`,  err => {
      resposta = err ? `Usuario nao encontrado... :/` : `Usuario deletado com sucesso... :(`;
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(resposta);
    });
    
  }
});

//Execução
server.listen(port, hostname, () => {
  console.log(`Ta rodando bemqui ó http://${hostname}:${port}/`);
});