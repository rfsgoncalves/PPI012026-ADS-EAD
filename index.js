import express from 'express';

const host = "0.0.0.0"; //requisições podem vir de todas as interfaces do host local
const porta = 3000; //identifica única e exclusivamente uma aplicação neste host

const app = express();

//Todo o conteúdo do diretório Views/public estará disponível na raiz do servidor
app.use(express.static('./Views/public'));

app.use(express.static('./Views/private'));

app.post("/login", (requisicao, resposta) =>{
    //Precisamos extrair os dados da requisição
    //Os dados estão armazenados no corpo da requisição
    const dados = requisicao.body;
});

app.listen(porta, host, () => { //arrow function
    console.log(`Servidor rodando em http://${host}:${porta}`);
}) //javascript aceita funções como parâmetros de outras funções