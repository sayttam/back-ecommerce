import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import userModel from '../persistence/mongoDB/models/user.model.mjs';
import dotenv from 'dotenv';

dotenv.config();


const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token']
    }
    return token;
};

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_KEY
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await userModel.findById(jwt_payload.id);
        if (user) return done(null, user);
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;
