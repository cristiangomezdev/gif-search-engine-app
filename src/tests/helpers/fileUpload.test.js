import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';
cloudinary.config({ 
    cloud_name: "dxxntjwmu",
    api_key: "828162296252421",
    api_secret: "Icjl5mEwXQwbCZLgwrR953fxKhk",
    secure: true
  });

describe('File upload test',() => {
    test('test fileupload', async(done) => {
        //imagen random
        const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/800px-Sunflower_from_Silesia2.jpg'); 
        const blob = await resp.blob();

        const file = new File([blob],'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');
                //borrar imagen por id


        const segments = url.split('/');
        const imageId = segments[segments.length -1].replace('.jpg','');
        cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
            done();
        });
    });
    test('debe retornar un error', async() => {
        
        const file = new File([],'foto.png');
        const url = await fileUpload(file);


        expect(url).toBe(null);


    });
});