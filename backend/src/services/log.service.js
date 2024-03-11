import Log from '../models/Log.js'

const create = async ({ collectionName, objectBefore, objectAfter, action, id }) => {
    const newLog = await Log.create({
        collectionName,
        objectBefore,
        objectAfter,
        action, 
        id
    })
    return newLog;
}

const list = async (page, size, type, id) => {
    try {
        const startIndex = (page - 1) * size;
        const listLog = await Log.find({ collectionName: type, id }).skip(startIndex).limit(size);
        const totalRecors = await Log.countDocuments({ collectionName: type, id });
        return {
            statusCode: 1,
            items: listLog,
            totalPage: Math.ceil(totalRecors / size),
            activePage: page
        }
    } catch (error) {
        return {
            statusCode: 0,
            message: "System error!"
        }
    }
}

export default {
    create,
    list
}