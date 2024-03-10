import Log from '../models/Log.js'

const create = async ({collectionName, objectBefore, objectAfter, action}) => {
    const newLog = await Log.create({
        collectionName,
        objectBefore,
        objectAfter,
        action
    })
    return newLog;
}

export default {
    create
}