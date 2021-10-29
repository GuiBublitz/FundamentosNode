//Incluindo biblioteca
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile, readFile, unlink } from 'fs';
import { createServer, IncomingMessage, ServerResponse } from 'http';

// Definição de porta
const port = 5000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    // Implementar código aqui

    const urlparse = url.parse(request.url ? request.url : "", true);
    var resposta;
    const params = parse(urlparse.search ? urlparse.search : "");

    if (urlparse.pathname == '/criar-usuario') {
        //Salvar informações do usuário
        writeFile(`../users/${params.id}.txt`, JSON.stringify(params), (err: any) => {
            if (err) throw err;
            resposta = `Usuario criado com sucesso!! :)`;
            response.setHeader('Content-Type', 'text/plain');
            response.statusCode = 200;
            response.end(resposta);
        });
    }
    //Selecionar um usuário
    else if (urlparse.pathname == '/selecionar-usuario') {
        readFile(`../users/${params.id}.txt`, (err, data) => {
            resposta = data;

            response.setHeader('Content-Type', 'text/plain');
            response.statusCode = 200;
            response.end(resposta);
        });
    }
    //Remover o usuário
    else if (urlparse.pathname == '/deletar-usuario') {
        unlink(`../users/${params.id}.txt`, err => {
            resposta = err ? `Usuario nao encontrado... :/` : `Usuario deletado com sucesso... :(`;
            response.setHeader('Content-Type', 'text/plain');
            response.statusCode = 200;
            response.end(resposta);
        });

    }
});

//Execução
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});