import express from 'express';
import autenticar from './seguranca/autenticador.js';
import session from 'express-session';

const host = "0.0.0.0"; //requisições podem vir de todas as interfaces do host local
const porta = 3000; //identifica única e exclusivamente uma aplicação neste host

const app = express();
app.use(session({
    secret: 'm1nh4Ch4v3S3cr3t4',
    resave: false, //não salvar a sessão se nenhuma informação foi modificada
    saveUninitialized: true, //não criar uma sessão se nenhuma informação foi salva
    cookie: { 
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 15 // 15 minutos
     }
}
));
//HTTP é stateless - ou seja - ele não distingue usuários
//Para dar ao HTTP a capacidade de identificar usuários, precisamos utilizar cookies de sessão
//Criando uma sessão para cada usuário autenticado

//escolher a biblioteca que irá processar os parâmetros da requisição
//querystring -> extended = false
//qs  -> extended = true
app.use(express.urlencoded({extended: true}));

//Todo o conteúdo do diretório Views/public estará disponível na raiz do servidor
app.use(express.static('./Views/public'));
                       

app.post("/login", (requisicao, resposta) =>{
    //Precisamos extrair os dados da requisição
    //Os dados estão armazenados no corpo da requisição
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === "admin" && senha === "123") {
        //atualizar a sessão do usuário
        requisicao.session.usuarioLogado = true;
        resposta.redirect("/menu.html");
    } else {
        resposta.redirect("/login.html");
    }
});

app.get("/login", (requisicao, resposta) => {
    resposta.redirect("/login.html");
});

app.get("/logout", (requisicao, resposta) => {
    //atualizar a sessão do usuário
    requisicao.session.destroy();
    resposta.redirect("/login.html");
});

//middleware
app.use(autenticar,express.static('./Views/private'));

app.listen(porta, host, () => { //arrow function
    console.log(`Servidor rodando em http://${host}:${porta}`);
}) //javascript aceita funções como parâmetros de outras funções