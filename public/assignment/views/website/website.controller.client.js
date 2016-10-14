(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.website = WebsiteService.findWebsiteById($routeParams.wid);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.updateWebsite = _updateWebsite;
        vm.deleteWebsite = _deleteWebsite;

        function _updateWebsite(website) {
            WebsiteService.updateWebsite(vm.website._id, website);
            $location.url(`/user/${vm.userId}/website`);
        }

        function _deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website._id);
            $location.url(`/user/${vm.userId}/website`);
        }
    }

})();
