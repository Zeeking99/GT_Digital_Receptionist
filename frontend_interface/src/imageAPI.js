import axios from 'axios'

async function imageAPI(image)
{
    const payload =
    {
        val : "Image"
    }

    console.log(image)
    const response = await axios.post('http://localhost:5000/sendimage', payload)
    
    //console.log(response.data.val)
    //resp = response.data.val
    return response
}

export default imageAPI