(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"},
        ];

        var fac = {};

        fac.createUser = function (user) {
            users.push(user);
        };

        fac.findUserById = function (userId) {
            // this.findUserById = function (userId) {
            for (var user of users) {
                if (user._id === userId) {
                    return user;
                }
            }
            return null;
        };

        fac.findUserByUsername = function (username) {
            for (var user of users) {
                if (user.username === username) {
                    return user;
                }
            }
            return null;
        };

        fac.findUserByCredentials = function (username, password) {
            for (var user of users) {
                if (user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        };

        fac.updateUser = function (userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    return;
                }
            }
        };

        fac.deleteUser = function (userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    return;
                }
            }
        };

        return fac;
    }
})();
