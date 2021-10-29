"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Incluindo biblioteca
var query_string_1 = require("query-string");
var url = __importStar(require("url"));
var fs_1 = require("fs");
var http_1 = require("http");
// Definição de porta
var port = 5000;
var server = (0, http_1.createServer)(function (request, response) {
    // Implementar código aqui
    var urlparse = url.parse(request.url ? request.url : "", true);
    var resposta;
    var params = (0, query_string_1.parse)(urlparse.search ? urlparse.search : "");
    if (urlparse.pathname == '/criar-usuario') {
        //Salvar informações do usuário
        (0, fs_1.writeFile)("../users/" + params.id + ".txt", JSON.stringify(params), function (err) {
            if (err)
                throw err;
            resposta = "Usuario criado com sucesso!! :)";
            response.setHeader('Content-Type', 'text/plain');
            response.statusCode = 200;
            response.end(resposta);
        });
    }
    //Selecionar um usuário
    else if (urlparse.pathname == '/selecionar-usuario') {
        (0, fs_1.readFile)("../users/" + params.id + ".txt", function (err, data) {
            resposta = data;
            response.setHeader('Content-Type', 'text/plain');
            response.statusCode = 200;
            response.end(resposta);
        });
    }
    //Remover o usuário
    else if (urlparse.pathname == '/deletar-usuario') {
        (0, fs_1.unlink)("../users/" + params.id + ".txt", function (err) {
            resposta = err ? "Usuario nao encontrado... :/" : "Usuario deletado com sucesso... :(";
            response.setHeader('Content-Type', 'text/plain');
            response.statusCode = 200;
            response.end(resposta);
        });
    }
});
//Execução
server.listen(port, function () {
    console.log("Server running on port " + port);
});
