(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.formUser = {};
        vm.login = _login;

        function _login() {
            vm.user = UserService.findUserByCredentials(vm.formUser.username, vm.formUser.password);
            if (vm.user) {
                $location.url(`/user/${vm.user._id}`);
            } else {
                vm.alert = "Incorrect username or password";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.formUser = {};
        vm.register = _register;

        function _register() {
            if (vm.formUser.password !== vm.formUser.password2){
                vm.alert = "The two passwords are not identical";
                return;
            }
            if (!vm.formUser.password){
                vm.alert = "Password cannot be empty";
                return;
            }
            var user = {
                _id: String(Date.now()),
                username: vm.formUser.username,
                password: vm.formUser.password,
            };
            UserService.createUser(user);
            $location.url(`/user/${user._id}`);
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.user = UserService.findUserById($routeParams.uid);
        vm.updateUser = _updateUser;

        function _updateUser(){
            UserService.updateUser(vm.user._id, vm.user);
        }
    }

})();
