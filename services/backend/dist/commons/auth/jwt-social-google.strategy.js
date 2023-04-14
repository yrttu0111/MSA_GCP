"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class JwtGoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor() {
        super({
            clientID: '875802817329-chfq072k9veu43js8opdm608j9drtn7v.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'https://localhost:3000/login/google',
            scope: ['email', 'profile'],
        });
    }
    validate(accessToken, profile) {
        return {
            email: profile.emails[0].value,
            password: '1234eeee',
            name: profile.displayName,
            age: 0,
        };
    }
}
exports.JwtGoogleStrategy = JwtGoogleStrategy;
//# sourceMappingURL=jwt-social-google.strategy.js.map