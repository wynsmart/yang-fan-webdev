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
            console.log('logging in');
            if (!vm.user.username) {
                vm.error = 'username cannot be empty';
                return;
            }
            if (!vm.user.password) {
                vm.error = 'password cannot be empty';
                return;
            }
            UserService.findUserByCredentials(vm.user.username, vm.user.password).then(
                res => {
                    if (res.data) {
                        var uid = res.data._id;
                        $location.url(vm.shared.getRoute('profile', {uid: uid}));
                    } else {
                        vm.error = 'Incorrect username or password';
                    }
                }
            );
        }
    }

    function RegisterController($location, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;
        vm.user = {};
        vm.register = register;

        function register() {
            console.log('registering');
            if (vm.user.password !== vm.user.password2) {
                vm.error = 'The two passwords are not identical';
                return;
            }
            if (!vm.user.password) {
                vm.error = 'Password cannot be empty';
                return;
            }
            var user = {
                username: vm.user.username,
                password: vm.user.password,
            };
            UserService.createUser(user).then(
                res => {
                    var uid = res.data._id;
                    $location.url(vm.shared.getRoute('profile', {uid: uid}));
                }
            );
        }
    }

    function ProfileController($routeParams, $location, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;
        vm.user = {};
        vm.header = {
            title: 'Profile',
            actionBtn: {
                icon: "ok",
                click: () => updateUser(),
            },
        };
        vm.unregister = deleteUser;

        var uid = $routeParams.uid;
        UserService.findUserById(uid).then(
            res => {
                vm.user = res.data;
            }
        );

        function updateUser() {
            console.log('updating user');
            UserService.updateUser(vm.user._id, vm.user);
        }

        function deleteUser() {
            console.log('removing user');
            UserService.deleteUser(vm.user._id).then(
                () => {
                    $location.url(vm.shared.getRoute('login'));
                }
            );
        }
    }

})();
