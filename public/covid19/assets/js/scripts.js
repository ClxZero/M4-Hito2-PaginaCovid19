import { postData } from './AuthProcess.js';
import { getInfoTabla, getInfoPais } from './InfoRetrival.js';
import nuevaChart from './GraficoPaises/GraficoPaises.js';
import { SeccionVerMas } from './VerMas/vermas.js';
import { completarAlRey } from './InicioSesion.js';
import { switchBotonSesion, togglePresentacion, toggleTableCard, switchBtnVerTodo } from "./Tugliglugli.js";
import paginaActual from './PaginaActual.js';
import { verTODO, verPagina } from './VerMas/VerTODO.js';


window.CerrarSesion = () => {
    localStorage.clear();
    location.reload();
};

window.destroyChart = () => {
    let chartStatus = Chart.getChart("ChartModalGen");
    chartStatus.destroy();
};

// Onload !

window.onload = () => {

    let indexGlobal = 0;
    let tablapaises = document.getElementById("vermasrequest");
    let avisoCarga = document.getElementById("avisoCarga");

    const IniciarSesionCHantamente = async ()  => {
        let mail = "Shanna@melissa.tv";
        let pass = "secret";

        let jwt = await postData(mail, pass)

    };

    IniciarSesionCHantamente();

    // checkeo inicial


    const init = async () => {

        const token = localStorage.getItem('jwt-token');

        if (token) {

            const estadisticas = await getInfoTabla(token);
            console.log(estadisticas);

            nuevaChart(estadisticas, indexGlobal);


            // toggleTableCard();
            // switchBotonSesion();
            // togglePresentacion();

            document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

            avisoCarga.innerHTML = `Cargando Tabla con Información...`;

            SeccionVerMas(estadisticas, indexGlobal);

            return estadisticas
        }
    };

    init();


    //iniciar sesion, anterior, siguiente

    document.getElementById("btnInicioSesion").addEventListener("click", async () => {

        let mail = document.getElementById("email1").value;
        let pass = document.getElementById("password1").value;

        const token = await postData(mail, pass);

        let estadisticas = await getInfoTabla(token); //estadisticas son los datos de la api

        switchBotonSesion();
        toggleTableCard();
        togglePresentacion();

        nuevaChart(estadisticas, indexGlobal);

        avisoCarga.innerHTML = `Cargando Tabla con Información...`;

        document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

        tablapaises.innerHTML = `<p class="text-center font-weight-lighter text-muted">Cargando Tabla con Información...</p>`;
        SeccionVerMas(estadisticas, indexGlobal);



    });


    document.getElementById("previo").addEventListener("click", async () => {

        event.preventDefault();

        indexGlobal -= 10;

        if (indexGlobal < 0) {
            indexGlobal = 0;
        }

        else {

            let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'))                                                                                                                                        //by ClxZero  clarx@live.cl

            let chartStatus = Chart.getChart("tablapro");
            if (chartStatus != undefined) {
                chartStatus.destroy();
            }

            nuevaChart(estadisticas, indexGlobal);
            
            document.getElementById("BtnVerPagina").innerHTML = `Ver Página ${paginaActual(indexGlobal)}`;

            avisoCarga.innerHTML = `Cargando Tabla con Información...`;

            document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

            tablapaises.innerHTML = `<p class="text-center font-weight-lighter text-muted">Cargando Tabla con Información...</p>`;
            SeccionVerMas(estadisticas, indexGlobal);

        };

    });

    document.getElementById("siguiente").addEventListener("click", async () => {

        event.preventDefault();

        indexGlobal += 10;

        let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'));

        let chartStatus = Chart.getChart("tablapro");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }

        nuevaChart(estadisticas, indexGlobal);
        
        document.getElementById("BtnVerPagina").innerHTML = `Ver Página ${paginaActual(indexGlobal)}`;

        avisoCarga.innerHTML = `Cargando Tabla con Información...`;

        document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

        tablapaises.innerHTML = `<p class="text-center font-weight-lighter text-muted">Cargando Tabla con Información...</p>`;
        SeccionVerMas(estadisticas, indexGlobal);

    });


    //otros 


    document.getElementById("llenardatosForm").addEventListener("click", () => {

        completarAlRey();

    });

    document.getElementById("BtnVerTodo").addEventListener("click", async () => {

        event.preventDefault();

        switchBtnVerTodo();
        
        document.getElementById("BtnVerPagina").innerHTML = `Ver Página ${paginaActual(indexGlobal)}`;

        avisoCarga.innerHTML = `Cargando Tabla con Información...`;

        let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'));

        tablapaises.innerHTML = `<p class="text-center font-weight-lighter text-muted">Cargando Tabla con TODA la Información...</p>`;

        verTODO(estadisticas);

    });

    document.getElementById("BtnVerPagina").addEventListener("click", async () => {

        event.preventDefault();

        avisoCarga.innerHTML = `Cargando Tabla con Información...`;

        switchBtnVerTodo();

        let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'));

        tablapaises.innerHTML = `<p class="text-center font-weight-lighter text-muted">Cargando Tabla con Información de esta página...</p>`;

        verPagina(estadisticas, indexGlobal);

    });



};


