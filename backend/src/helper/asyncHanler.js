//bat loi o cac router roi chuyen den middleware de xu li loi
const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

export default asyncHandler