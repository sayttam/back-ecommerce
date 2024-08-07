import passport from 'passport';

const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return res.status(500).send({ message: 'Server Error' });
        if (!user) return res.status(401).send({ message: 'Unauthorized' });
        req.user = user;
        next();
    })(req, res, next);
};

export default auth;
