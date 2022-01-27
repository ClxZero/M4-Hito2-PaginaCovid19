const switchBotonSesion = () => {
    $("#js-abrir-wrapper").toggle();
    $("#js-cerrar-wrapper").toggle();
};

const toggleTableCard = () => {
    $("#table-card-wrapper").toggle();
};


const switchBtnVerTodo = () => {
    $("#BtnVerTodo").toggle();
    $("#BtnVerPagina").toggle();
};

const switchSituChileSituMundial = () => {
    $("#SituacionChile-card-wrapper").show();
    $("#table-card-wrapper").hide();
};

const switchBtnHome = () => {
    $("#SituacionChile-card-wrapper").hide();
    $("#table-card-wrapper").show();
};


export { switchBotonSesion, toggleTableCard, switchBtnVerTodo, switchSituChileSituMundial, switchBtnHome }