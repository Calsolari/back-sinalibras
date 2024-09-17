/*********************************************************
 * Objetivo: Arquivo para realizar as requisições do aplicativo 
 * data: 03/09/2024
 * Autor: Julia Mendes 
 * Versão: 1.0
 ***********************************************************/

const express = require('express')
const cors = require ('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {
    
    response.header('Access-Control-Allow-Origin', "*") 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())
    next()
})

const bodyParserJson = bodyParser.json()


/************************************ Controller  ******************************/
const controllerAluno = require('./controller/controller_aluno')
const controllerProfessor = require('./controller/controller_professor')


/************************************ Aluno ******************************/

app.get('/v1/sinalibras/alunos', cors(), async function(request, response){

    //Chama a função da controller para retorNAR FILMES
    let dadosUsuarios = await controllerAluno.getListarAlunos();

    console.log(dadosUsuarios);
    

    //Validação para retornar o JSON dos filmes ou retornar o 404
    if(dadosUsuarios.alunos.length >0){
        response.json(dadosUsuarios);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404);
    }

})

app.get('/v1/sinalibras/alunos/:id', cors(), async function(request,response,next){

    let idUsuario = request.params.id;

    //Encaminh o ID para o controller buscar o filme
    let dadosUsuarios = await controllerAluno.getBuscarAlunoById(idUsuario)

    response.status(dadosUsuarios.status_code);
    response.json(dadosUsuarios);

});

app.get('/v1/sinalibras/alunosNome/:nome', cors(), async function(request,response,next){

        let nomeUsuario = request.query.nome
        let usuariosNome = await controllerAluno.getBuscarAlunoNome(nomeUsuario)
    
            response.json(usuariosNome);
             response.status(usuariosNome.status_code)
     })


app.get('/v1/sinalibras/alunosemail/:email', cors(), async function(request,response,next){

        let emailUsuario = request.query.email
        let usuarios = await controllerAluno.getBuscarAlunoEmail(emailUsuario)
    
            response.json(usuarios);
             response.status(usuarios.status_code)
     })

app.post('/v1/sinalibras/alunos', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']

    let dadosBody = request.body
    let resultadoNovoUsuario = await controllerAluno.setInserirNovoAluno(dadosBody,contentType)

    response.status(resultadoNovoUsuario.status_code)
    response.json(resultadoNovoUsuario)
})


app.put('/v1/sinalibras/alunos/:id', cors(), bodyParserJson, async function(request,response){
    let contentType = request.headers['content-type']
    let idUsuario = request.params.id

    let dadosBody = request.body
    let resultadoNovoUsuario = await controllerAluno.setAtualizarAluno(idUsuario, dadosBody, contentType)

    response.status(resultadoNovoUsuario.status_code)
    response.json(resultadoNovoUsuario)
})

app.delete('/v1/sinalibras/aluno/:id', cors(), async function(request,response){

    let idUsuario = request.params.id

    let dadosUsuario = await controllerAluno.setExcluirAluno(idUsuario)
    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)

})

/*********************** Professor *****************************/

app.post('/v1/sinalibras/professor', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']

    let dadosBody = request.body
    let resultadoNovoProfessor = await controllerProfessor.setInserirNovoProfessor(dadosBody,contentType)

    response.status(resultadoNovoProfessor.status_code)
    response.json(resultadoNovoProfessor)
})

app.put('/v1/sinalibras/professor/:id', cors(), bodyParserJson, async function(request,response){
    let contentType = request.headers['content-type']
    let idProfessor = request.params.id

    let dadosBody = request.body
    let resultadoNovoProfessor = await controllerProfessor.setAtualizarProfessor(idProfessor, dadosBody, contentType)

    response.status(resultadoNovoProfessor.status_code)
    response.json(resultadoNovoProfessor)
})

app.delete('/v1/sinalibras/professor/:id', cors(), async function(request,response){

    let idProfessor = request.params.id

    let dadosProfessor = await controllerProfessor.setExcluirProfessor(idProfessor)
    response.status(dadosProfessor.status_code)
    response.json(dadosProfessor)

})

app.get('/v1/sinalibras/professores', cors(), async function(request, response){

    //Chama a função da controller para retorNAR FILMES
    let dadosProfessores = await controllerProfessor.getListarProfessores();

    //Validação para retornar o JSON dos filmes ou retornar o 404
    if(dadosProfessores.length > 0){
        response.json(dadosProfessores);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404);
    }

})

app.get('/v1/sinalibras/professor/:id', cors(), async function(request,response,next){

    let idProfessor = request.params.id;

    //Encaminh o ID para o controller buscar o filme
    let dadosProfessores = await controllerProfessor.getBuscarProfessorById(idProfessor)

    response.status(dadosProfessores.status_code);
    response.json(dadosProfessores);

});

app.get('/v1/sinalibras/professorNome/:nome', cors(), async function(request,response,next){

        let nomeProfessor = request.query.nome
        let professorNome = await controllerProfessor.getBuscarProfessorNome(nomeProfessor)
    
            response.json(professorNome);
             response.status(professorNome.status_code)
     })


app.get('/v1/sinalibras/professoremail/:email', cors(), async function(request,response,next){

        let emailProfessor = request.query.email
        let professor = await controllerProfessor.getBuscarProfessorEmail(emailProfessor)
    
            response.json(professor);
             response.status(professor.status_code)
     })


app.listen('8080', function(){
    console.log("API funcionando e aguardando requisições");
})
