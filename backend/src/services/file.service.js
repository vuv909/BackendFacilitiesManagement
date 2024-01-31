import multiparty from 'multiparty';
import { v2 as cloudinary } from 'cloudinary'
import util from 'util'

const uploadFile = async (req, attributeName, validateObject ) => {
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
            const errors = []
            Object.keys(fields).forEach((field) => {
                // Use the first element if it's an array, otherwise use the value as is
                const fieldValue = Array.isArray(fields[field]) ? fields[field][0] : fields[field];
                resultObject[field] = fieldValue;
                const error = validateData(fieldValue, validateObject[field], field);
                if(error != undefined && !error){
                    errors.push(error);
                }
            });
            
            if(errors.length > 0){
                resolve({
                    errors
                })
            }

            const filesData = files[attributeName];
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

function validateData(data, validateCondition, fieldName) {
    const errors = [];

    if (!validateCondition) {
        return errors;
    }
    
    for (const key of Object.keys(validateCondition)) {
        if (key === "isEmpty" && !validateCondition[key]) {
            if (!data || data.length < 1) {
                const error = {
                    field: fieldName,
                    msg: `${fieldName} can not be empty`
                };
                console.log(error);
                errors.push(error); // Push error object to the errors array
            }
        }
    }

    return errors; // Return the array of errors
}


export default {
    uploadFile,
    validateData
}