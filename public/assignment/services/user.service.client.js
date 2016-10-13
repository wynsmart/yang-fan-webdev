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

        return {
            createUser: _createUser,
            findUserById: _findUserById,
            findUserByUsername: _findUserByUsername,
            findUserByCredentials: _findUserByCredentials,
            updateUser: _updateUser,
            deleteUser: _deleteUser,
        };

        function _createUser(user) {
            users.push(user);
        }

        function _findUserById(userId) {
            for (var user of users) {
                if (user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function _findUserByUsername(username) {
            for (var user of users) {
                if (user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function _findUserByCredentials(username, password) {
            for (var user of users) {
                if (user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function _updateUser(userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    return;
                }
            }
        }

        function _deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
