import Log from '../models/Log.js'

const create = async ({ collectionName, objectBefore, objectAfter, action }) => {
    const newLog = await Log.create({
        collectionName,
        objectBefore,
        objectAfter,
        action
    })
    return newLog;
}

const list = async (page, size, type) => {
    try {
        const startIndex = (page - 1) * size;
        const listLog = await Log.find({ collectionName: type }).skip(startIndex).limit(size);
        const totalRecors = await Log.countDocuments({ collectionName: type });
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