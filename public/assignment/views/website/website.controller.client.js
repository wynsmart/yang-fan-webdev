(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, SharedService, WebsiteService) {
        var vm = this;
        vm.shared = SharedService;
        vm.websites = WebsiteService.findWebsitesByUser(vm.shared.user._id);
    }

    function NewWebsiteController($routeParams, SharedService, WebsiteService) {
        var vm = this;
        vm.shared = SharedService;
        vm.website = {};
        vm.websites = WebsiteService.findWebsitesByUser(vm.shared.user._id);
        vm.createWebsite = _createWebsite;

        function _createWebsite() {
            WebsiteService.createWebsite(vm.shared.user._id, vm.website);
            vm.websites.push(vm.website);
            vm.website = {};
        }
    }

    function EditWebsiteController($location, $routeParams, SharedService, WebsiteService) {
        var vm = this;
        vm.shared = SharedService;
        vm.website = WebsiteService.findWebsiteById($routeParams.wid);
        vm.websites = WebsiteService.findWebsitesByUser(vm.shared.user._id);
        vm.updateWebsite = _updateWebsite;
        vm.deleteWebsite = _deleteWebsite;

        function _updateWebsite(website) {
            WebsiteService.updateWebsite(vm.website._id, website);
        }

        function _deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website._id);
            $location.url(`/user/${vm.shared.user._id}/website`);
        }
    }

})();
