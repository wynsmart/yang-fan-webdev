(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = _login;

        function _login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user) {
                $location.url(`/user/${user._id}`);
            } else {
                console.log(user);
            }
        }
    }

    function RegisterController() {

    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.user = UserService.findUserById($routeParams.uid);
    }

})();
