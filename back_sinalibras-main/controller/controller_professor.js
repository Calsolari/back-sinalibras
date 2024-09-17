/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de usuários
 * Data: 03/09/2024
 * Autor: Julia Mendes 
 * Versão: 1.0
 * 
************************************************************************************************************/

const message = require('../modulo/config.js')
const professorDAO = require('../model/DAO/professor.js');
const data = require('./validacao_data.js')


const getListarProfessores = async function () {

    // Cri o objeto JSON
    let professoresJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosProfessor = await professorDAO.selectAllProfessores()

    // Validação para verificar s existem dados 
    if (dadosProfessor) {

        if (dadosProfessor.length > 0) {
             // Cria o JSON para devolver para o APP
            professoresJSON.professores = dadosProfessor;
            professoresJSON.quantidade = dadosProfessor.length;
            professoresJSON.status_code = 200;
            return professoresJSON;
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB;
    }

}

const getBuscarProfessorById = async function (id){
    let idProfessor = id 

    let professorJSON = {}

    if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
        return message.ERROR_INVALID_ID; //400
    } else {

       
        let dadosProfessor= await professorDAO.selectByIdProfessor(idProfessor)

       
        if (dadosProfessor) {

        
            if (dadosProfessor.length > 0) {
                professorJSON.professor = dadosProfessor;
                professorJSON.status_code = 200;

                return professorJSON

            } else {
                return message.ERROR_NOT_FOUND; //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }
    }

}

const getBuscarProfessorNome = async (nome) => {
    // Cria o objeto JSON
     
    let nomeProfessor = nome
    let professorJSON = {};

    if (nomeProfessor == '' || nomeProfessor == undefined) {
        return message.ERROR_INVALID_ID
    } else {
    
        let dadosProfessor = await professorDAO.selectProfessorByNome(nome)

        if (dadosProfessor) {
            if (dadosProfessor.length > 0) {
                
                professorJSON.professor = dadosProfessor;
                professorJSON.status_code = 200;

                return professorJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
}

const getBuscarProfessorEmail = async (email) => {
    // Cria o objeto JSON

    let emailProfessor = email
    let professorJSON = {};

    if (emailProfessor == '' || emailProfessor == undefined) {
        return message.ERROR_INVALID_ID
    } else {
    
        let dadosProfessor = await professorDAO.selectProfessorByEmail(email)

        if (dadosProfessor) {
            if (dadosProfessor.length > 0) {
                
                professorJSON.professor = dadosProfessor;
                professorJSON.status_code = 200;

                return professorJSON;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }


    }
}

       


const setInserirNovoProfessor = async function (dadosProfessor, contentType) {
    
    try{
      
        if (String(contentType).toLowerCase() == 'application/json'){
          
            let novoProfessorJSON = {}

            if(
               dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome == null || dadosProfessor.nome.length > 255||
               dadosProfessor.email == "" || dadosProfessor.email == undefined || dadosProfessor.email == null|| dadosProfessor.email.length > 255||
               dadosProfessor.senha == "" || dadosProfessor.senha == undefined || dadosProfessor.senha == null||  dadosProfessor.senha.length > 8 || 
               dadosProfessor.foto_perfil == undefined || dadosProfessor.foto_perfil == "" || dadosProfessor.foto_perfil.length > 255
            ){
                return message.ERROR_REQUIRED_FIELDS
            }

            if (!dadosProfessor.data_nascimento || !data.validarData(dadosProfessor.data_nascimento)) {
                return message.ERROR_INVALID_DATA 
            }
               
                let novoProfessor = await professorDAO.insertProfessor(dadosProfessor)
               
                if (novoProfessor){
                
                    let ultimoID = await professorDAO.selectUltimoIdProfessor()
                   
                    dadosProfessor.id = Number(ultimoID[0].id)
                    
                }
                
                if (novoProfessor){
                    novoProfessorJSON.professor = dadosProfessor
                    novoProfessorJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoProfessorJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoProfessorJSON.message = message.SUCESS_CREATED_ITEM.message
                    
                    return novoProfessorJSON //201
                }else {
                    return message.ERROR_INTERNAL_SERVER_DB // 500 
                
            
            }
        
        }else{
            return message.ERROR_CONTENT_TYPE//415
        }
        
    }catch(error){
        
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}




const setAtualizarProfessor = async function (id, dadosProfessor, contentType){

   
    let idUsuario = id

  

    if (idUsuario== '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID; 
        }else {
          
            let result = await professorDAO.selectByIdProfessor(idUsuario)
            let verificarId = result.length
            if (verificarId > 0) {
                
                try{

                    if (String(contentType).toLowerCase() == 'application/json'){

                        let updateUsuarioJSON = {}

                        if(
                            dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome == null || dadosProfessor.nome.length > 255||
                            dadosProfessor.email == "" || dadosProfessor.email == undefined || dadosProfessor.email == null|| dadosProfessor.email.length > 255||
                            dadosProfessor.senha == "" || dadosProfessor.senha == undefined || dadosProfessor.senha == null||  dadosProfessor.senha.length > 8 || 
                            dadosProfessor.foto_perfil == undefined || dadosProfessor.foto_perfil == "" || dadosProfessor.foto_perfil.length > 255
                         ){
                            return message.ERROR_REQUIRED_FIELDS
                         }

                         if (!dadosProfessor.data_nascimento || !data.validarData(dadosProfessor.data_nascimento)) {
                            return message.ERROR_INVALID_DATA 
                        }

                            let usuarioAtualizado = await professorDAO.updateProfessor(id, dadosProfessor)
            
                            if (usuarioAtualizado){
                            
                               updateUsuarioJSON.professor = dadosProfessor
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

   
    const setExcluirProfessor = async function (id){
        try{
            let idProfessor = id 
    
            if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
                return message.ERROR_INVALID_ID; //400
            } else {
                let dadosProfessor = await professorDAO.selectByIdProfessor(idProfessor);
                let verificarId = dadosProfessor.length
                if (verificarId > 0) {
    
                    dadosProfessor = await professorDAO.deleteProfessor(idProfessor)
                    
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
    getListarProfessores,
    getBuscarProfessorById,
    getBuscarProfessorNome,
    getBuscarProfessorEmail,
    setInserirNovoProfessor,
    setAtualizarProfessor,
    setExcluirProfessor
}
