import axios from 'axios'
import { socket } from './Chatcontainer'

async function API(message)
{
    /*const payload =
    {
        val : message
    }*/

    const response = await axios.post('http://localhost:5000/send', message)

    const respond = socket.emit('user-message', message)
    console.log(respond)
    
    return response.data.val
}

export default API