import axios from 'axios'


async function API(message)
{
    const payload =
    {
        val : message
    }

    const response = await axios.post('http://localhost:5000/send', payload)
    
    //console.log(response.data.val)
    //resp = response.data.val
    return response.data.val
}


//async function API(message)
//{
//    //let msg = {}
//    let requestOptions =
//    {
//        method: 'POST',
//        headers: 
//        { 
//            'Content-Type': 'application/json',
//            //'Accept': 'application/json'
//        },
//        //body: JSON.stringify(message)
//        body: message
//    }
//
//    let data = 'lol'
//    let response = await fetch('http://localhost:5000/send', requestOptions)//.then( result => {result = result.val} ).then(data => {return data});
//    data = await response.json()
//    //console.log(JSON.stringify(data))
//    return data
//}

export default API