import axios from 'axios'
//import imageToBase64 from 'image-to-base64'

async function imageAPI(image)
{
    /*const payload =
    {
        val : image
    }*/

    //let baseimage = imageToBase64(image)
    console.log(image)
    const response = await axios.post('http://localhost:5000/sendimage', image, {headers : { 'Content-Type': image.type}})
    
    //console.log(response.data.val)
    //resp = response.data.val
    return response
}

export default imageAPI