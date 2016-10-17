(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($sceProvider, $routeProvider, SharedServiceProvider) {
        var routeMap = SharedServiceProvider.$get().routeMap;
        $sceProvider
            .enabled(false);
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
            })
            .when(routeMap.website_list, {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
            })
            .when(routeMap.website_new, {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
            })
            .when(routeMap.website_edit, {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
            })
            .when(routeMap.page_list, {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
            })
            .when(routeMap.page_new, {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
            })
            .when(routeMap.page_edit, {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
            })
            .when(routeMap.widget_list, {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
            })
            .when(routeMap.widget_chooser, {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
            })
            .when(routeMap.widget_edit, {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
            })
            .otherwise({
                redirectTo: routeMap.login,
            });
    }

})();
