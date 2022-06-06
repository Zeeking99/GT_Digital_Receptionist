import axios from 'axios'
import { socket } from './Chatcontainer'

async function API(message)
{
    /*const payload =
    {
        val : message
    }*/

    //const response = await axios.post('http://localhost:5000/send', message)

    let respond = ''

    socket.on('user-message', (message) => { respond = message } )
   
    console.log(respond)
    //return response.data.val
    return respond
    
    //return response.data.val
}

export default API