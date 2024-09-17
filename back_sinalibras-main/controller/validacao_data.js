const validarData = (data) => {
    const regexData = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

 
    if (!regexData.test(data)) {
        return false;
    }

    
    if (data === "0000-00-00") {
        return false;
    }

    
    const [ano, mes, dia] = data.split('-').map(Number);


    if (mes < 1 || mes > 12) {
        return false;
    }

    
    if (dia < 1 || dia > 31) {
        return false;
    }

    return true; 
}

module.exports = {
    validarData
}