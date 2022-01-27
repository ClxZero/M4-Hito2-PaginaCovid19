import { graficoSituacionChile } from './SituacionChile/GrfSituChile.js';

const getInfoTabla = async () => {

    try {

        const response = await fetch(`http://localhost:3000/api/total`,);

        const { data } = await response.json();

        return data

    } catch (err) {

        console.error(`Error: ${err}`)

    }
};



const getInfoPais = async (jwt, pais) => {

    try {

        const response = await fetch(`http://localhost:3000/api/countries/${pais}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

        const { data } = await response.json();

        return data

    } catch (err) {

        console.error(`Error: ${err}`)

    }
};


// Sobre situación Chile

let indexCargaSituChile = 0;
let sCConfirmados; 
let sCMuertos;
let sCRecuperados;
let cantidaddecarga = document.getElementById("cargandocantidad");
let cargando = document.getElementById("cargando");

const getInfoGrafChile1 = async (jwt) => {

    try {

        //Confirmed 

        const response = await fetch(`http://localhost:3000/api/confirmed`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })


        const { data } = await response.json();
        
        sCConfirmados = data;
        indexCargaSituChile++;
        if (indexCargaSituChile == 3) {
            cargando.style.display = "none";
            graficoSituacionChile(sCConfirmados, sCMuertos, sCRecuperados);
        } else {
            cantidaddecarga.innerHTML = `Cargando... ${indexCargaSituChile}/3 archivos listos.`;
        };

        return data

    } catch (err) {

        console.error(`Error: ${err}`)

    }
};

const getInfoGrafChile2 = async (jwt) => {

    try {
        //Deaths

        const response = await fetch(`http://localhost:3000/api/deaths`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

        const { data } = await response.json();
        
        indexCargaSituChile++;
        sCMuertos = data;
        if (indexCargaSituChile == 3) {
            cargando.style.display = "none";
            graficoSituacionChile(sCConfirmados, sCMuertos, sCRecuperados);
        } else {
            cantidaddecarga.innerHTML = `Cargando... ${indexCargaSituChile}/3 archivos listos.`;
        };

        return data

    } catch (err) {

        console.error(`Error: ${err}`)

    }
};

const getInfoGrafChile3 = async (jwt) => {

    try {

        const response = await fetch(`http://localhost:3000/api/recovered`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

        const { data } = await response.json();
        
        indexCargaSituChile++;
        sCRecuperados = data;
        if (indexCargaSituChile == 3) {
            cargando.style.display = "none";
            graficoSituacionChile(sCConfirmados, sCMuertos, sCRecuperados);
        } else {
            cantidaddecarga.innerHTML = `Cargando... ${indexCargaSituChile}/3 archivos listos.`;
        };

        return data

    } catch (err) {

        console.error(`Error: ${err}`)

    }
};



export { getInfoTabla, getInfoPais, getInfoGrafChile1, getInfoGrafChile2, getInfoGrafChile3 }
