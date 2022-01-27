import { postData } from './AuthProcess.js';
import { getInfoTabla, getInfoPais, getInfoGrafChile1, getInfoGrafChile2, getInfoGrafChile3 } from './InfoRetrival.js';
import nuevaChart from './GraficoPaises/GraficoPaises.js';
import { SeccionVerMas } from './VerMas/vermas.js';
import { completarAlRey } from './InicioSesion.js';
import { switchBotonSesion, toggleTableCard, switchBtnVerTodo, switchBtnHome, switchSituChileSituMundial } from "./Tugliglugli.js";
import paginaActual from './PaginaActual.js';
import { verTODO, verPagina } from './VerMas/VerTODO.js';
import { graficoSituacionChile } from './SituacionChile/GrfSituChile.js';


window.CerrarSesion = () => {
    localStorage.clear();
    location.reload();    
    document.getElementById('NavSituChile').style.display = "none";
    let chartStatus = Chart.getChart("GraficoSituacionChile");
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
};

window.destroyChart = () => {
    let chartStatus = Chart.getChart("ChartModalGen");
    chartStatus.destroy();
};

// Onload !

window.onload = () => {

    let indexGlobal = 0;
    let tablapaises = document.getElementById("vermasrequest");

    let estadisticasCn;
    let estadisticasDe;
    let estadisticasRe;


    // checkeo inicial


    const init = async () => {

        const token = localStorage.getItem('jwt-token');
        const estadisticas = await getInfoTabla();
        console.log(estadisticas);

        nuevaChart(estadisticas, indexGlobal);

        document.getElementById("paginaactual").innerHTML = `Página ${paginaActual(indexGlobal)}`

        SeccionVerMas(estadisticas, indexGlobal);

        if (token) {

            switchBotonSesion();
            
            document.getElementById('NavSituChile').style.display = "block";

            estadisticasCn = await getInfoGrafChile1(localStorage.getItem('jwt-token'));
            estadisticasDe = await getInfoGrafChile2(localStorage.getItem('jwt-token'));
            estadisticasRe = await getInfoGrafChile3(localStorage.getItem('jwt-token'));

        } else { 
            document.getElementById('NavSituChile').style.display = "none";
        };

        return estadisticas
    };

    init();


    //iniciar sesion, anterior, siguiente

    document.getElementById("btnInicioSesion").addEventListener("click", async () => {

        event.preventDefault();

        let mail = document.getElementById("email1").value;
        let pass = document.getElementById("password1").value;
        document.getElementById('NavSituChile').style.display = "block";

        const token = await postData(mail, pass);

        let estadisticas = await getInfoTabla(token); //estadisticas son los datos de la api

        estadisticasCn = await getInfoGrafChile1(token);
        estadisticasDe = await getInfoGrafChile2(token);
        estadisticasRe = await getInfoGrafChile3(token);

        switchBotonSesion();
        toggleTableCard();   //Aqui se saca la pantalla de inicio (situacion mundial)

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

        let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'));

        tablapaises.innerHTML = `<p class="text-center font-weight-lighter text-muted">Cargando Tabla con TODA la Información...</p>`;

        verTODO(estadisticas);

    });

    document.getElementById("BtnVerPagina").addEventListener("click", async () => {

        event.preventDefault();

        switchBtnVerTodo();

        let estadisticas = await getInfoTabla(localStorage.getItem('jwt-token'));

        tablapaises.innerHTML = `<p class="text-center font-weight-lighter text-muted">Cargando Tabla con Información de esta página...</p>`;

        verPagina(estadisticas, indexGlobal);

    });

    document.getElementById("homee").addEventListener("click", async () => {
        switchBtnHome();
    });

    //Situacion CHile

    document.getElementById("NavSituChile").addEventListener("click", async () => {

        event.preventDefault();

        switchSituChileSituMundial();

        document.getElementById('cargando').style.display = "block";

        let chartStatus = Chart.getChart("GraficoSituacionChile");

        if (chartStatus != undefined) {

            document.getElementById('cargando').style.display = "none";

        } else {

            document.getElementById('cargando').style.display = "block";

        };

    });

};


