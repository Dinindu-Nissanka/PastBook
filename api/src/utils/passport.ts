import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'config';
import User from '../model/user.model';
import { PassportStatic } from 'passport';

// Passport strategy to authentication
export const applyPassportStrategy = (passport: PassportStatic): void => {
  const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  const secretOrKey: string = config.get('jwt.privateKey');
  passport.use(
    new Strategy({ jwtFromRequest, secretOrKey }, (payload, done) => {
      User.findOne(
        { email: payload.email },
        (err: any, user: { email: string }) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, {
              email: user.email,
            });
          }
          return done(null, false);
        }
      );
    })
  );
};
