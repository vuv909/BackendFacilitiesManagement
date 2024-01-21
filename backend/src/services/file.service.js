import multiparty from 'multiparty';
import { v2 as cloudinary } from 'cloudinary'
import util from 'util'

const uploadFile = async (req) => {
    return new Promise((resolve, reject) => {
        const urls = [];
        const form = new multiparty.Form({ maxFieldsSize: "20MB" });
        form.parse(req, async function (err, fields, files) {
            if (err) {
                console.error(err);
                return reject(err);
            }
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                folder: "/manage-facility",
            };

            const resultObject = {}

            Object.keys(fields).forEach(field => {
                // Use the first element if it's an array, otherwise use the value as is
                resultObject[field] = Array.isArray(fields[field]) ? fields[field][0] : fields[field];
            });

            const filesData = files.file;
            if(filesData != undefined){
                for (let i = 0; i < filesData.length; i++) {
                    const imagePath = filesData[i].path;
                    try {
                        const result = await cloudinary.uploader.upload(imagePath, options);
                        urls.push(result.secure_url);
    
                        if (i === filesData.length - 1 && !!result.secure_url) {
                            resolve({
                                body: resultObject,
                                urls: urls
                            })
                        }
                    } catch (error) {
                        console.error(error);
                        return error.toString();
                    }
                }
            }else{
                resolve({
                    body: resultObject
                })
            }
        });
    });
}

export default {
    uploadFile
}