import axios from 'axios'
import { socket } from './Chatcontainer'

async function API(message)
{
    /*const payload =
    {
        val : message
    }*/

    //const response = await axios.post('http://localhost:5000/send', message)

    socket.emit('user-message', message)
    let respond = ''
    socket.on('user-message', (message) => { console.log(message); respond = message } )
   
    console.log(respond)
    //return response.data.val
    return respond
    //const response = socket.emit('user-message', message)
    
    //return response.data.val
}

export default API