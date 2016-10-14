(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;
        vm.user = {};
        vm.login = _login;

        function _login() {
            vm.shared.user = UserService.findUserByCredentials(vm.user.username, vm.user.password);
            if (vm.shared.user) {
                $location.url(`/user/${vm.shared.user._id}`);
            } else {
                vm.alert = "Incorrect username or password";
            }
        }
    }

    function RegisterController($location, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;
        vm.user = {};
        vm.register = _register;

        function _register() {
            if (vm.user.password !== vm.user.password2){
                vm.alert = "The two passwords are not identical";
                return;
            }
            if (!vm.user.password){
                vm.alert = "Password cannot be empty";
                return;
            }
            vm.shared.user = {
                _id: String(Date.now()),
                username: vm.user.username,
                password: vm.user.password,
            };
            UserService.createUser(vm.shared.user);
            $location.url(`/user/${vm.shared.user._id}`);
        }
    }

    function ProfileController($routeParams, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;
        vm.updateUser = _updateUser;

        function _updateUser(){
            UserService.updateUser(vm.shared.user._id, vm.shared.user);
        }
    }

})();
