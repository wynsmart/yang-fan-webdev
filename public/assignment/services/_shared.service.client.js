(function () {
    angular
        .module("WebAppMaker")
        .factory("SharedService", SharedService);

    function SharedService($routeParams, UserService) {
        return {
            user: UserService.findUserById($routeParams.uid),
        };
    }
})();