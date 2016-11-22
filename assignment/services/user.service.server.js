module.exports = function (app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        models.user.findUserByCredentials(username, password).then(
            function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

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

    app.get('/api/loggedin', loggedin);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);

    app.post('/api/user', auth, createUser);
    app.get('/api/user', auth, findUserByCredentials);
    app.get('/api/user/:uid', auth, findUserById);
    app.put('/api/user/:uid', auth, updateUser);
    app.delete('/api/user/:uid', auth, deleteUser);

    function auth(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(204);
        } else {
            next();
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
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
