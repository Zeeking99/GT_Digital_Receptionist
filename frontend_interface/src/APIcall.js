import axios from 'axios'
import Chatcontainer from './Chatcontainer'
import socket from './Chatcontainer'

async function API(message)
{
    /*const payload =
    {
        val : message
    }*/

    const response = await axios.post('http://localhost:5000/send', message)

    //const response = socket.emit('user-message', message)
    
    return response.data.val
}

export default API