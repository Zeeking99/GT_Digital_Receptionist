async function API(message)
{
    let requestOptions =
    {
        mode: 'no-cors',
        method: 'POST',
        headers: 
        { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        //body: JSON.stringify(message)
        body: message
    }

    const response = await fetch('http://localhost:5000/send', requestOptions)

    console.log(response.body)

    const res = response.json()

    console.log(response)
    
    let data = res

    return data
}

export default API
