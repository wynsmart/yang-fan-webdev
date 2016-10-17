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
        vm.createWebsite = createWebsite;

        function createWebsite() {
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
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.website._id, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website._id);
            $location.url(vm.shared.getRoute('website_list'));
        }
    }

})();
