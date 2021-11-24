module.exports = (paramName = 'id') => async (req, res, next) => {
    const id = req.params[paramName];

    try {
        const data =  await req.storage.getById(id);
        if (!data) {
            throw new Error('Not found')
        }

        req.data = data;
        next()
    } catch (err) {
        res.status(403).json({message: 'No such record'})
    }
}