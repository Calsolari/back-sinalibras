/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de usuários
 * Data: 03/09/2024
 * Autor: Julia Mendes 
 * Versão: 1.0
 * 
************************************************************************************************************/

const message = require('../modulo/config.js')
const alunoDao = require('../model/DAO/aluno.js');
const data = require('./validacao_data.js')


const getListarAlunos = async function () {

    // Cri o objeto JSON
    let usuariosJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosUsuarios = await alunoDao.selectAllAlunos();

    // Validação para verificar s existem dados 
    if (dadosUsuarios) {

        if (dadosUsuarios.length > 0) {
             // Cria o JSON para devolver para o APP
            usuariosJSON.alunos = dadosUsuarios;
            usuariosJSON.quantidade = dadosUsuarios.length;
            usuariosJSON.status_code = 200;
            return usuariosJSON;
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB;
    }

}

const getBuscarAlunoById = async function (id){
    let idUsuario = id 

    let usuarioJSON = {}

    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID; //400
    } else {

       
        let dadosUsuario= await alunoDao.selectByIdAluno(idUsuario);

       
        if (dadosUsuario) {

        
            if (dadosUsuario.length > 0) {
                usuarioJSON.aluno = dadosUsuario;
                usuarioJSON.status_code = 200;

                return usuarioJSON

            } else {
                return message.ERROR_NOT_FOUND; //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }
    }

}

const getBuscarAlunoNome = async (nome) => {
    // Cria o objeto JSON
     
    let nomeUsuario = nome
    let usuariosJSON = {};

    if (nomeUsuario == '' || nomeUsuario == undefined) {
        return message.ERROR_INVALID_ID
    } else {
    
        let dadosUsuarios = await alunoDao.selectAlunoByNome(nome)

        if (dadosUsuarios) {
            if (dadosUsuarios.length > 0) {
                
                usuariosJSON.alunos = dadosUsuarios;
                usuariosJSON.status_code = 200;

                return usuariosJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
}

const getBuscarAlunoEmail = async (email) => {
    // Cria o objeto JSON

    let emailUsuario = email
    let usuariosJSON = {};

    if (emailUsuario == '' || emailUsuario == undefined) {
        return message.ERROR_INVALID_ID
    } else {
    
        let dadosUsuarios = await alunoDao.selectAlunoByEmail(email)


        if (dadosUsuarios) {
            if (dadosUsuarios.length > 0) {
                usuariosJSON.alunos = dadosUsuarios;
                usuariosJSON.status_code = 200;

                // console.log(usuariosJSON)

                return usuariosJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
}

       


const setInserirNovoAluno = async function (dadosAluno, contentType) {
    
    try{
      
        if (String(contentType).toLowerCase() == 'application/json'){
          
            let novoAlunoJSON = {}

            if(
               dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome == null || dadosAluno.nome.length > 255||
               dadosAluno.email == "" || dadosAluno.email == undefined || dadosAluno.email == null|| dadosAluno.email.length > 255||
               dadosAluno.senha == "" || dadosAluno.senha == undefined || dadosAluno.senha == null||  dadosAluno.senha.length > 8 || 
               dadosAluno.foto_perfil == undefined || dadosAluno.foto_perfil.length > 255
            ){
                return message.ERROR_REQUIRED_FIELDS
            }

            if (!dadosAluno.data_nascimento || !data.validarData(dadosAluno.data_nascimento)) {
                return message.ERROR_INVALID_DATA 
            }
               
                let novoAluno= await alunoDao.insertAluno(dadosAluno)
               
                if (novoAluno){
                
                    let ultimoID = await alunoDao.selectUltimoIdAluno()
                   
                    dadosAluno.id = Number(ultimoID[0].id)
                    
                }
                
                if (novoAluno){
                    novoAlunoJSON.aluno = dadosAluno
                    novoAlunoJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoAlunoJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoAlunoJSON.message = message.SUCESS_CREATED_ITEM.message
                    
                    return novoAlunoJSON //201
                }else {
                    return message.ERROR_INTERNAL_SERVER_DB // 500 
                
            
            }
        
        }else{
            return message.ERROR_CONTENT_TYPE//415
        }
        
    }catch(error){
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}


const setAtualizarAluno = async function (id, dadosAluno, contentType){

   
    let idUsuario = id

  

    if (idUsuario== '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID; 
        }else {
          
            let result = await alunoDao.selectByIdAluno(idUsuario)
            let verificarId = result.length
            if (verificarId > 0) {
                
                try{

                    if (String(contentType).toLowerCase() == 'application/json'){

                        let updateUsuarioJSON = {}

                        if(
                            dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome == null || dadosAluno.nome.length > 255||
                            dadosAluno.email == "" || dadosAluno.email == undefined || dadosAluno.email == null|| dadosAluno.email.length > 255||
                            dadosAluno.senha == "" || dadosAluno.senha == undefined || dadosAluno.senha == null||  dadosAluno.senha.length > 8 || 
                             dadosAluno.foto_perfil == undefined || dadosAluno.foto_perfil == "" || dadosAluno.foto_perfil.length > 255
                         ){
                            return message.ERROR_REQUIRED_FIELDS
                         }

                         if (!dadosAluno.data_nascimento || !data.validarData(dadosAluno.data_nascimento)) {
                            return message.ERROR_INVALID_DATA 
                        }

                            let usuarioAtualizado = await alunoDao.updateAluno(id, dadosAluno)
            
                            if (usuarioAtualizado){
                            
                               updateUsuarioJSON.aluno = dadosAluno
                               updateUsuarioJSON.status = message.SUCESS_UPDATED_ITEM.status
                               updateUsuarioJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                               updateUsuarioJSON.message = message.SUCESS_UPDATED_ITEM.message
                                
                                return updateUsuarioJSON //201
                            }else {
                          
                                return message.ERROR_INTERNAL_SERVER_DB // 500 
                            }


                        

                    }else{
                        return message.ERROR_CONTENT_TYPE
                    }
                }catch(error){
                   
                    return message.ERROR_INTERNAL_SERVER
                }
            }else{
                return message.ERROR_NOT_FOUND_ID
            }

        

        }
    
    }
   
    const setExcluirAluno = async function (id){
        try{
            let idUsuario = id 
    
            if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
                return message.ERROR_INVALID_ID; //400
            } else {
                let dadosUsuario = await alunoDao.selectByIdAluno(idUsuario);
                let verificarId = dadosUsuario.length
                if (verificarId > 0) {
    
                    dadosUsuario = await alunoDao.deleteAluno(idUsuario)
                    
                    return message.SUCESS_DELETED_ITEM
                } else {
                    return message.ERROR_NOT_FOUND_ID
                }
            }
        } catch {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    
           
        
    }
    





module.exports = {
    getListarAlunos,
    getBuscarAlunoById,
    getBuscarAlunoNome,
    getBuscarAlunoEmail,
    setInserirNovoAluno,
    setAtualizarAluno,
    setExcluirAluno
}
