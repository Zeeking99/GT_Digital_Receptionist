import axios from 'axios'

async function imageAPI(image)
{
    /*const payload =
    {
        val : image
    }*/

    //console.log(image)
    const response = await axios.post('http://localhost:5000/sendimage', image)
    
    return response
}

export default imageAPI