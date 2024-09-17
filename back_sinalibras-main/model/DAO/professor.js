/************************************************************************************************************
 * Objetivo: Arquivo responsável pela comunicação como banco de dados
 * Data: 03/09/2024
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/



const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const selectAllProfessores = async function (){
    
    let sql = 'select * from tbl_professor'

    let rsProfessor = await prisma.$queryRawUnsafe(sql);
    
    if(rsProfessor) {
    return rsProfessor;
}else
       return false;
}

const selectByIdProfessor = async function (id){
    try{
        let sql = `select * from tbl_professor where id = ${id}`

        let rsProfessor = await prisma.$queryRawUnsafe(sql)

        return rsProfessor
       

    } catch (error){
        return false
    }

}


const insertProfessor = async function(dadosProfessor){
   
    let sql 

    try{

        if(dadosProfessor.foto_perfil != "" && 
            dadosProfessor.foto_perfil != null &&
            dadosProfessor.foto_perfil != undefined
            ){
       
    sql = `insert into tbl_professor ( 
                            nome, 
                            email,
                            senha,
                            data_nascimento,
                            foto_perfil
                            ) values (
                                '${dadosProfessor.nome}',
                                '${dadosProfessor.email}',
                                '${dadosProfessor.senha}',
                                '${dadosProfessor.data_nascimento}',
                                '${dadosProfessor.foto_perfil}'
                            )`

            }else {

              sql =  `insert into tbl_professor ( 
                            nome, 
                            email,
                            senha,
                            data_nascimento,
                            foto_perfil
                            ) values (
                                '${dadosProfessor.nome}',
                                '${dadosProfessor.email}',
                                '${dadosProfessor.senha}',
                                '${dadosProfessor.data_nascimento}',
                                 null
                            )`
            }

        let rsProfessor = await prisma.$executeRawUnsafe(sql)

        if(rsProfessor){
            return true
        }else
            return false

    } catch(error) {
        return false
    }
}



    const selectUltimoIdProfessor = async function (){
        try{
           let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_professor limit 1;`
   
           let rsProfessor = await prisma.$queryRawUnsafe(sql);
           return rsProfessor
   
           
        } catch (error) {
           return false
       }
   }

   const updateProfessor = async function (id, dadosProfessor) {

    let sql  


    try{
       
        if(dadosProfessor.foto_perfil != "" && 
            dadosProfessor.foto_perfil != null &&
            dadosProfessor.foto_perfil != undefined
            ){
    
        sql = `update tbl_professor set
            nome =  '${dadosProfessor.nome}',
            email =  '${dadosProfessor.email}',
            senha =  '${dadosProfessor.senha}',
            data_nascimento =  '${dadosProfessor.data_nascimento}',
            foto_perfil = '${dadosProfessor.foto_perfil}'
            where tbl_professor.id = ${id}`

            }else{

                sql = `update tbl_professor set
                nome =  '${dadosProfessor.nome}',
                email =  '${dadosProfessor.email}',
                senha =  '${dadosProfessor.senha}',
                data_nascimento =  '${dadosProfessor.data_nascimento}',
                foto_perfil = null
                where tbl_professor.id = ${id}`


            }
       
    
        let rsProfessor = await prisma.$executeRawUnsafe(sql)
    
         if (rsProfessor)
         return true
         else
         return false 
    }catch(error){
        return false
    }

}

const deleteProfessor = async function (id){

    try {
   
       let sql = `delete from tbl_professor  where id = ${id}`
   
       let rsProfessor = await prisma.$executeRawUnsafe(sql);  
      
       if(rsProfessor)
       return true
      
     } catch (error) {
        
       return false
       }
   
}

const selectProfessorByNome = async function (nome){
    try{
        let sql = `select * from tbl_professor where nome LIKE "%${nome}%"`
       
        let rsUsuario = await prisma.$queryRawUnsafe(sql);
        return rsUsuario;
    } catch (error) {
        return false
    }
}



const selectProfessorByEmail = async function (email){
    try{
        let sql = `select * from tbl_professor where email LIKE "%${email}%"`

        let rsProfessor = await prisma.$queryRawUnsafe(sql)

        if(rsProfessor)
        return rsProfessor
    }catch(error){
        return false
    }
}


module.exports = {
    selectAllProfessores,
    selectByIdProfessor,
    selectProfessorByNome,
    selectProfessorByEmail,
    selectUltimoIdProfessor,
    deleteProfessor,
    updateProfessor,
    insertProfessor
}