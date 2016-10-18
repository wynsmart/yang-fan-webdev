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
        vm.login = login;

        function login() {
            vm.shared.user = UserService.findUserByCredentials(vm.user.username, vm.user.password);
            if (vm.shared.user) {
                $location.url(vm.shared.getRoute('profile', {uid: vm.shared.user._id}));
            } else {
                vm.error = "Incorrect username or password";
            }
            console.log('logged in user', vm.shared.user);
        }
    }

    function RegisterController($location, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;
        vm.user = {};
        vm.register = register;

        function register() {
            if (vm.user.password !== vm.user.password2) {
                vm.error = "The two passwords are not identical";
                return;
            }
            if (!vm.user.password) {
                vm.error = "Password cannot be empty";
                return;
            }
            vm.shared.user = {
                _id: String(Date.now()),
                username: vm.user.username,
                password: vm.user.password,
            };
            UserService.createUser(vm.shared.user);
            $location.url(vm.shared.getRoute('profile', {uid: vm.shared.user._id}));
            console.log('registered user', vm.shared.user);
        }
    }

    function ProfileController($routeParams, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'Profile',
            actionBtn: {
                icon: "ok",
                click: () => vm.updateUser(),
            },
        };
        vm.updateUser = updateUser;

        function updateUser() {
            UserService.updateUser(vm.shared.user._id, vm.shared.user);
            console.log('updated user', vm.shared.user);
        }
    }

})();
