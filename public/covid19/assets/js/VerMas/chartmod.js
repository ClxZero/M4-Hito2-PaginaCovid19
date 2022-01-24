const chartmodData = ((pais, activos, recuperados, muertes, confirmados) => {   
    const labels = ['Activos', 'Recuperados', 'Muertes', 'Confirmados'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: `${pais}`,
                data: [activos, recuperados, muertes, confirmados],
                backgroundColor: [
                    "rgba(0, 128, 0, 0.5)",
                    "rgba(0, 0, 255, 0.5)",
                    "rgba(255, 0, 0, 0.5)",
                    "rgba(255, 255, 0, 0.5)"
                        ]
            }
        ]
    };


    const config = {
        type: 'polarArea',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `${pais}`
                }
            }
        },
    };


    const myChart = new Chart(
        document.getElementById(`ChartModalGen`),
        config
    );

});

export default chartmodData