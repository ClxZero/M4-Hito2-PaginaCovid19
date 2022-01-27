import { getInfoTabla, getInfoPais } from '../InfoRetrival.js';
import { crearDataset, paisesMod, selecc10 } from "../GraficoPaises/InputsGraficoPaises.js";
import correcionEpaciosPais from "./fixPaisesCnEspacio.js";
import chartmodData from './chartmod.js';


const jwt = localStorage.getItem('jwt-token')  //token para todo este modal js

let vermassection = document.getElementById("vermasrequest");


let crearListaVerMas = async (datosmod, indexGlobal) => {  //sacamos el nombre del pais que neesitamos desde la api total

  let text = ""; //usando una variable manda la tabla de una

  text += `      
        <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Pais</th>
            <th scope="col">Activos</th>
            <th scope="col">Recuperados</th>
            <th scope="col">Muertes</th>
            <th scope="col">Confirmados</th>
            <th scope="col">?</th>
          </tr>
        </thead>
        <tbody>`;

  for (let i = 0; i < 10; i++) {

    let nombrepais = datosmod.seleccionPais[i];

    let paisfix = correcionEpaciosPais(nombrepais);

    let pais = datosmod.seleccionPais[i];
    let activos = datosmod.seleccionActivos[i];
    let recuperados = datosmod.seleccionRecuperados[i];
    let confirmados = datosmod.seleccionConfirmados[i];
    let muertes = datosmod.seleccionMuertos[i];
    text += `
          <tr>
            <th scope="row">${pais}</th>
            <td>${activos}</td>
            <td>${recuperados}</td>
            <td>${muertes}</td>
            <td>${confirmados}</td>
            <td><a class="border-0 vermas" data-toggle="modal" href="#ModalVerMas" id="${paisfix}">
            Ver Más
           </a></td>
          </tr>`;


  };  //fin ciclo for

  text += `</tbody>
            </table>`;

  return text

};

let SeccionVerMas = async (estadisticas, indexGlobal) => {

  let datosmod = await paisesMod(estadisticas, indexGlobal);  // en este tienes que asegurarte que "estadisticas" sea un llamado a la api /Countrys/asdasd

  vermassection.innerHTML = "";

  let text = await crearListaVerMas(datosmod, indexGlobal);

  vermassection.innerHTML = text;

  document.querySelectorAll("a.vermas").forEach((e) => e.addEventListener("click", async () => {

    let pais = e.getAttribute('id');

    let datosAPIpaises = await getInfoPais(jwt, pais); //recivo info de un pais en especifico y luego lo envia a la función del mod

    let paisCompleto = datosAPIpaises.location;
    let activos = ((datosAPIpaises.confirmed - datosAPIpaises.deaths) * 0.4).toFixed(0);
    let recuperados = ((datosAPIpaises.confirmed - datosAPIpaises.deaths) * 0.6).toFixed(0);
    let confirmados = datosAPIpaises.confirmed;
    let muertes = datosAPIpaises.deaths;

    let seccionModalPais = document.getElementById("VerMasNombrePais");
    let seccionModalActivos = document.getElementById("VerMasModactivos");
    let seccionModalRecuperados = document.getElementById("VerMasModrecuperados");
    let seccionModalConfirmados = document.getElementById("VerMasModconfirmados");
    let seccionModalMuertos = document.getElementById("VerMasModmuertes");

    seccionModalPais.innerHTML = paisCompleto;
    seccionModalActivos.innerHTML = activos;
    seccionModalRecuperados.innerHTML = recuperados;
    seccionModalConfirmados.innerHTML = confirmados;
    seccionModalMuertos.innerHTML = muertes;



    chartmodData(paisCompleto, activos, recuperados, muertes, confirmados)


  }));

};


export { SeccionVerMas, crearListaVerMas };