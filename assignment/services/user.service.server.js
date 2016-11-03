module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"},
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = Date.now();
        users.push(user);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u of users) {
            if (u.username === username) {
                res.send(u);
                return;
            }
        }
        res.sendStatus(204);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u of users) {
            if (u.username === username &&
                u.password === password) {
                res.send(u);
                return;
            }
        }
        res.sendStatus(204);
    }

    function findUserById(req, res) {
        var userId = parseInt(req.params.uid);
        for (var u in users) {
            if (users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(204);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id === uid) {
                users[i] = user;
            }
        }
        res.sendStatus(200);
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id === uid) {
                users.splice(i, 1);
            }
        }
        res.sendStatus(200);
    }

};
