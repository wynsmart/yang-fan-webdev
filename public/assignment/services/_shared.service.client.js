(function () {
    angular
        .module("WebAppMaker")
        .factory("SharedService", SharedService);

    function SharedService($routeParams, UserService) {
        var routeMap = {
            login:          '/login',
            register:       '/register',
            profile:        '/user/:uid',
            website_list:   '/user/:uid/website',
            website_new:    '/user/:uid/website/new',
            website_edit:   '/user/:uid/website/:wid',
            page_list:      '/user/:uid/website/:wid/page',
            page_new:       '/user/:uid/website/:wid/page/new',
            page_edit:      '/user/:uid/website/:wid/page/:pid',
            widget_list:    '/user/:uid/website/:wid/page/:pid/widget',
            widget_chooser: '/user/:uid/website/:wid/page/:pid/widget/new',
            widget_edit:    '/user/:uid/website/:wid/page/:pid/widget/:wgid',
        };

        return {
            user: UserService.findUserById($routeParams.uid),
            routeMap: routeMap,
            getRoute: getRoute,
        };

        /*
        * Dynamically convert route pattern into real url
        * Example:
        * in: website_edit
        * out: /user/123/website/456, when :uid=123 and :wid=456
        * note: supplementaryDict is used to map keys which is not in url of current page
        * */
        function getRoute(routeKey, supplementaryDict){
            return routeMap[routeKey].replace(/:([^\/]+)/g, function (_, key) {
                return (key in $routeParams) ? $routeParams[key] : supplementaryDict[key];
            });
        }
    }
})();
