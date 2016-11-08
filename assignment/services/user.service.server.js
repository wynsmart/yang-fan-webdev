module.exports = function (app, db) {

    var UserModel = db.model('UserModel', db.Schema({
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
    }));

    app.post('/api/user', createUser);
    app.get('/api/user', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        UserModel.create(user, (err, user) => {
            console.log('created user:', user);
            res.json(user);
        });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        UserModel.findOne({username: username, password: password}, (err, user) => {
            console.log('found user:', user);
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(204);
            }
        });
    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        UserModel.findOne({_id: uid}, (err, user) => {
            console.log('found user:', user);
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(204);
            }
        });
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        UserModel.update({_id: uid}, user, (err, raw) => {
            console.log('updated user:', raw);
            res.sendStatus(200);
        });
    }

    function deleteUser(req, res) {
        // TODO: recursively delete all websites, pages, and widgets
        var uid = req.params.uid;
        UserModel.remove({_id: uid}, (err) => {
            console.log('deleted user:', uid);
            res.sendStatus(200);
        });
    }

};
