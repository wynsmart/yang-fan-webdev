(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.user =
        vm.websites = WebsiteService.findWebsitesByUser($routeParams.uid);
    }

    function NewWebsiteController() {

    }

    function EditWebsiteController() {

    }

})();
