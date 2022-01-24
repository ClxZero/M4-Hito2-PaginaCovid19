const switchBotonSesion = () => {
    // $("#js-iniciar-wrapper").toggle();
    $("#js-cerrar-wrapper").toggle();
};

const toggleTableCard = () => {
    $("#table-card-wrapper").toggle();
};

const togglePresentacion = () => {
    $("#cartaPresentacion-wrapper").toggle();
};

const switchBtnVerTodo = () => {
    $("#BtnVerTodo").toggle();
    $("#BtnVerPagina").toggle();
};



export { switchBotonSesion, togglePresentacion, toggleTableCard, switchBtnVerTodo }