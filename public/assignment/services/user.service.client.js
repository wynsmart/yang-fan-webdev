(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        return {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            currentUser: currentUser,
        };

        function createUser(user) {
            return $http.post('/api/user', user);
        }

        function findUserById(userId) {
            return $http.get(`/api/user/${userId}`);
        }

        function findUserByCredentials(username, password) {
            return $http.get(`/api/user?username=${username}&password=${password}`);
        }

        function updateUser(userId, user) {
            return $http.put(`/api/user/${userId}`, user);
        }

        function deleteUser(userId) {
            return $http.delete(`/api/user/${userId}`);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function currentUser() {
            return $http.get('/api/currentuser');
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }
    }
})();
