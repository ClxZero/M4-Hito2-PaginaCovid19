const paginaActual = (indexGlobal) => {

let pagina = 0

if (indexGlobal == 0) {

    pagina = 1
    
} else {

    pagina = (indexGlobal / 10) + 1
    
}

return pagina

};


export default paginaActual