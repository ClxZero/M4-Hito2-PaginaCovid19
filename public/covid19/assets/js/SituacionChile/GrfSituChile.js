const graficoSituacionChile = async (sCConfirmados, sCMuertos, sCRecuperados) => {

    let fechas = [];
    let numConfirmados = [];
    let numMuertos = [];
    let numRecuperados = [];

    for (let i = 0; i < sCConfirmados.length; i++) {
        fechas.push(sCConfirmados[i].date);
        numConfirmados.push(sCConfirmados[i].total);
        numMuertos.push(sCMuertos[i].total);
        numRecuperados.push(sCRecuperados[i].total);
    };

    const labels = fechas;
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Confirmados',
                data: numConfirmados,
                borderWidth: 2,
                borderColor: "#fecb5a",
                backgroundColor: "#fecb5a",
            },
            {
                label: 'Muertos',
                data: numMuertos,
                borderWidth: 2,
                borderColor: "#c9cbcf",
                backgroundColor: "#c9cbcf",
            },
            {
                label: 'Recuperados',
                data: numRecuperados,
                borderWidth: 2,
                borderColor: "#4cbfc0",
                backgroundColor: "#4cbfc0",
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Situación Chile',
                    color: 'black',
                    font: {
                        size: 32,
                        family: 'monospace',
                        weight: 'normal',
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        },
    };


    const myChart = new Chart(
        document.getElementById('GraficoSituacionChile'),
        config
    );

}

export { graficoSituacionChile }