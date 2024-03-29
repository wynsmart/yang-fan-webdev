module.exports = function (app, models) {

    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID: '225445621218181',
        clientSecret: '8386ac1657704cbf0ecfff26fda654e3',
        callbackURL: '/auth/facebook/callback',
        profileFields: ['displayName', 'name', 'email'],
    };

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        })
    );

    app.get('/api/loggedin', loggedin);
    app.post('/api/login', passport.authenticate('local'), currentUser);
    app.post('/api/logout', logout);
    app.post('/api/register', register);

    app.all('/api/\*', auth);
    app.post('/api/user', createUser);
    app.get('/api/currentuser', currentUser);
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function localStrategy(username, password, done) {
        models.user.findUserByUsername(username).then(
            function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        models.user.findUserByFacebookId(profile.id)
            .then(
                user => {
                    console.log('fb callback:', token, refreshToken, profile);
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = {
                            username: profile._json.name,
                            firstName: profile._json.first_name,
                            lastName: profile._json.last_name,
                            email: profile._json.email,
                            facebook: {
                                id: profile.id,
                                token: token,
                            },
                        };
                        return models.user.createUser(newUser);
                    }
                },
                err => {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                user => {
                    return done(null, user);
                },
                err => {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        models.user.findUserById(user._id).then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
    }

    function auth(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function currentUser(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        models.user.createUser(user).then(
            user => {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function createUser(req, res) {
        var user = req.body;
        models.user.createUser(user).then(
            user => {
                console.log('created user:', user);
                res.json(user);
            }
        );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        models.user.findUserByCredentials(username, password).then(
            user => {
                console.log('found user:', user);
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        models.user.findUserById(uid).then(
            user => {
                console.log('found user:', user);
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        models.user.findUserByUsername(username).then(
            user => {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(204);
                }
            }
        );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        models.user.updateUser(uid, user).then(
            raw => {
                console.log('updated user:', raw);
                res.sendStatus(200);
            }
        );
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        models.user.deleteUser(uid).then(
            () => {
                console.log('deleted user:', uid);
                res.sendStatus(200);
            }
        );
    }

};
