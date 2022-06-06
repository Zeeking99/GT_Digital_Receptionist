import axios from 'axios'
import { socket } from './Chatcontainer'

async function API(message)
{
    /*const payload =
    {
        val : message
    }*/

    const response = await axios.post('http://localhost:5000/send', message)

<<<<<<< HEAD
    //const response = socket.emit('user-message', message)
=======
    const respond = socket.emit('user-message', message)
    console.log(respond)
>>>>>>> f899209f319b79a5bfbf09722d503e47ae8dd96e
    
    return response.data.val
}

export default API