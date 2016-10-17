(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, SharedService, PageService) {
        var vm = this;
        vm.shared = SharedService;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
    }

    function NewPageController(SharedService) {
        var vm = this;
        vm.shared = SharedService;
        vm.createPage = createPage;

        function createPage() {

        }
    }

    function EditPageController(SharedService, PageService) {
        var vm = this;
        vm.shared = SharedService;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage() {
            // PageService.updatePage();
        }

        function deletePage() {

        }
    }

})();
