//Este js trabaja los datos autorizados para que sean leidos de forma óptima para crear las tablas

// calculo oficial
// Calculo será    recuperados: [casos_confirmados - muertes]  * 0.6    
//                  activos:    [casos_confirmados - muertes]  * 0.4  


let crearDataset = async (estadisticas, indexGlobal, requesto) => {

    let dataset = []; 
    let setpaises = [];
    let setconfirmados = [];
    let setmuertos = [];
    let setactivos = [];
    let setrecuperados = [];


    estadisticas.forEach(element => {

        let casosactivos = (element.confirmed - element.deaths) * 0.4;

        if (casosactivos >= 10000) {

            setpaises.push(element.location);
            setconfirmados.push(element.confirmed);
            setmuertos.push(element.deaths);
            setactivos.push((element.confirmed - element.deaths) * 0.4);
            setrecuperados.push((element.confirmed - element.deaths) * 0.6);

        };

    });

    let seleccionPais = selecc10(setpaises, indexGlobal);
    let seleccionConfirmados = selecc10(setconfirmados, indexGlobal);
    let seleccionMuertos = selecc10(setmuertos, indexGlobal);
    let seleccionActivos = selecc10(setactivos, indexGlobal);
    let seleccionRecuperados = selecc10(setrecuperados, indexGlobal);


    dataset.push({
        label: 'Casos Activos',
        data: seleccionActivos,
        borderColor: "rgb(142, 115, 115)",
        backgroundColor: "rgb(122, 115, 82)",
    },
        {
            label: 'Casos Confirmados',
            data: seleccionConfirmados,
            borderColor: "rgb(88, 255, 200)",
            backgroundColor: "rgb(211, 255, 88)",
        },
        {
            label: 'Decesos',
            data: seleccionMuertos,
            borderColor: "rgb(243, 111, 221)",
            backgroundColor: "rgb(220, 23, 23)",
        },
        {
            label: 'Recuperados',
            data: seleccionRecuperados,
            borderColor: "rgb(94, 194, 238)",
            backgroundColor: "rgb(49, 105, 219)",
        }
    );

    switch (requesto) {
        case "pais":
            return seleccionPais
            break;

        default:
            return dataset
            break;
    };

}


let selecc10 = (arri, indexGlobal) => {
    let corteDe10 = [];
    for (let i = 0; i < 10; i++) {
        corteDe10.push(arri[i + indexGlobal]);                                                                                                                                // código por ClxZero, saludos!!! --> clarx@live.cl
    };
    return corteDe10
};


let paisesMod = async (estadisticas, indexGlobal) => {

    let setpaises = [];
    let setconfirmados = [];
    let setmuertos = [];
    let setactivos = [];
    let setrecuperados = [];

    estadisticas.forEach(element => {

        let casosactivos = (element.confirmed - element.deaths) * 0.4;

        if (casosactivos >= 10000) {

            setpaises.push(element.location);
            setconfirmados.push(element.confirmed);
            setmuertos.push(element.deaths);
            setactivos.push(((element.confirmed - element.deaths) * 0.4).toFixed(0));
            setrecuperados.push(((element.confirmed - element.deaths) * 0.6).toFixed(0));

        };

    });

    let seleccionPais = selecc10(setpaises, indexGlobal);
    let seleccionConfirmados = selecc10(setconfirmados, indexGlobal);
    let seleccionMuertos = selecc10(setmuertos, indexGlobal);
    let seleccionActivos = selecc10(setactivos, indexGlobal);
    let seleccionRecuperados = selecc10(setrecuperados, indexGlobal);

    return {seleccionPais, seleccionConfirmados, seleccionMuertos, seleccionActivos, seleccionRecuperados}

};


let paises10milmasTODOS = (estadisticas) => {

    let setpaises = [];
    let setconfirmados = [];
    let setmuertos = [];
    let setactivos = [];
    let setrecuperados = [];

    estadisticas.forEach(element => {

        setpaises.push(element.location);
        setconfirmados.push(element.confirmed);
        setmuertos.push(element.deaths);
        setactivos.push(((element.confirmed - element.deaths) * 0.4).toFixed(0));
        setrecuperados.push(((element.confirmed - element.deaths) * 0.6).toFixed(0));

        // let casosactivos = (element.confirmed - element.deaths) * 0.4;
        // if (casosactivos >= 10000) {
        //     setpaises.push(element.location);
        // };

    });

   
    return { setpaises, setconfirmados, setmuertos, setactivos, setrecuperados }

};

export { crearDataset, paisesMod, selecc10, paises10milmasTODOS }
