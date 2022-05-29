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

export default API