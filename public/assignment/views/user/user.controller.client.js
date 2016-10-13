(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController);

    function LoginController(UserService) {
        console.log(UserService.findUserById('123'));
    }

    function RegisterController() {

    }

})();
