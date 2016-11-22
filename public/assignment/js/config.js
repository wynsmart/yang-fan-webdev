(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider, SharedServiceProvider) {
        var routeMap = SharedServiceProvider.$get().routeMap;

        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function (user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };

        $routeProvider
            .when(routeMap.login, {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model",
            })
            .when(routeMap.register, {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model",
            })
            .when(routeMap.profile, {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.website_list, {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.website_new, {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.website_edit, {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.page_list, {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.page_new, {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.page_edit, {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.widget_list, {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.widget_chooser, {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.widget_edit, {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin},
            })
            .when(routeMap.flickr, {
                templateUrl: 'views/widget/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model',
                resolve: {loggedin: checkLoggedin},
            })
            .otherwise({
                redirectTo: routeMap.login,
            });
    }

})();
