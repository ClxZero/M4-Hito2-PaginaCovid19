const getInfoTabla = async (jwt) => {

    try {

        const response = await fetch(`http://localhost:3000/api/total`,
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

export { getInfoTabla, getInfoPais }
