module.exports = function (app, models) {

    app.post('/api/user', createUser);
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

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
