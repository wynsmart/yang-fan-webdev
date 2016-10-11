(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "/views/user/login.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();