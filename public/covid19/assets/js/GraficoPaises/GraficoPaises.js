import { crearDataset, paisesMod, selecc10 } from "./InputsGraficoPaises.js";


const nuevaChart = async (estadisticas, indexGlobal) => {

    const dataset = await crearDataset(estadisticas, indexGlobal, "dataset");
    const labels = await crearDataset(estadisticas, indexGlobal, "pais");

    const data = {
        labels: labels,
        datasets: dataset
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Paises Covid-19'
                }
            }
        },
    };

     const myChart = new Chart(
            document.getElementById('tablapro'),
            config
        );

};



export default nuevaChart