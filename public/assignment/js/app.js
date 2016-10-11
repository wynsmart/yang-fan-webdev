(function () {
    angular
        .module("WebAppMaker",['ngRoute'])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }

})();