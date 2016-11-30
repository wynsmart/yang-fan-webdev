(function () {
    angular
        .module("WebAppMaker")
        .factory("SharedService", SharedService);

    function SharedService($routeParams, $http) {
        var routeMap = {
            login: '/login',
            register: '/register',
            user: '/user',
            profile: '/user/:uid',
            website_list: '/user/:uid/website',
            website_new: '/user/:uid/website/new',
            website_edit: '/user/:uid/website/:wid',
            page_list: '/user/:uid/website/:wid/page',
            page_new: '/user/:uid/website/:wid/page/new',
            page_edit: '/user/:uid/website/:wid/page/:pid',
            widget_list: '/user/:uid/website/:wid/page/:pid/widget',
            widget_chooser: '/user/:uid/website/:wid/page/:pid/widget/new',
            widget_edit: '/user/:uid/website/:wid/page/:pid/widget/:wgid',
            flickr: '/user/:uid/website/:wid/page/:pid/widget/:wgid/flicker',
        };

        return {
            routeMap: routeMap,
            getRoute: getRoute,
        };

        /*
         * Dynamically convert route pattern into real url
         * Example:
         * in: website_edit
         * out: /user/123/website/456, when :uid=123 and :wid=456
         * note: priorDict is used to map keys prior to $routeParams
         * */
        function getRoute(routeKey, priorDict) {
            return routeMap[routeKey].replace(/:([^\/]+)/g, function (_, key) {
                return priorDict && key in priorDict ?
                    priorDict[key] : $routeParams[key];
            });
        }

    }
})();
