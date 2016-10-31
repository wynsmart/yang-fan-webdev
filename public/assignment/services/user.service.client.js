(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        return {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
        };

        function createUser(user) {
            users.push(user);
        }

        function findUserById(userId) {
            for (var user of users) {
                if (user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var user of users) {
                if (user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var user of users) {
                if (user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    return;
                }
            }
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    return;
                }
            }
        }
    }
})();
