(function () {
    angular
        .module("WebAppMaker")
        .directive('footer', Footer)
        .directive('websiteListHeader', WebsiteListHeader)
        .directive('websiteListContent', WebsiteListContent);

    function Footer() {
        return {
            templateUrl: '/assignment/views/user/footer.view.client.html',
        };
    }

    function WebsiteListHeader() {
        return {
            templateUrl: '/assignment/views/website/website-list-header.view.client.html',
        };
    }

    function WebsiteListContent() {
        return {
            templateUrl: '/assignment/views/website/website-list-content.view.client.html',
        };
    }
})();
