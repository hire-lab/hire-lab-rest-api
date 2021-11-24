module.exports = {
    isGuest() {
        return (req, res, next) => {
            if (req.user) {
                res.status(400).json({message: 'You are already signed in.'})
            } else {
                next()
            }
        }
    },
    isAuth() {
        return (req, res, next) => {
            if (!req.user) {
                res.status(401).json({message: 'Please sign in'})
            } else {
                next()
            }
        }
    },
    isOwner() {
        return (req, res, next) => {
            const job = req.data;

            if (req.user._id != job.owner) {
                res.status(403).json({message: 'You cannot modify this job listing'})
            } else {
                next()
            }
        }
    }
}