import React from 'react'
import { useState } from 'react'

const Cloudinary = (props) => {
    const {profilePicture, setProfilePicture} =props
    const preset_name = "default-img";                         
    const cloud_name = "dzpcrgb3m"                          

    //const [ image, setImage ] = useState('');       
    const [ loading, setLoading ] = useState(false) 
  

    const uploadImage = async (e)=>{            
        const files = e.target.files            
        const data = new FormData()             
        data.append('file', files[0])           
        data.append('upload_preset',preset_name)  

        setLoading(true)                        

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();     
            setProfilePicture(file.secure_url);              
            setLoading(false);                      
            //await actions.sendPhoto(file.secure_url)
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }

    }

  return (
    <div>

        {/*1 - El siguiente input type file envia la imagen por el evento al handler uploadImage */}

        <input type="file"
        name="file"
        placeholder='Upload an image'
        // accept='image/png, image/jpeg' 
        onChange={(e)=>uploadImage(e)}
        />

        {/* ------------------------------------------------------------------------------------ */}

        {/* 9 - Si loading true, Mostramos Loading, si no mostramos la imagen la cual su url deberia estar cargada en un estado local */}
        {loading &&
            <h3>Loading...</h3>
        }
        {/* ------------------------------------------------------------------------------------ */}

    </div>
  );
}

export default Cloudinary