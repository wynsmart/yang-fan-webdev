(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, SharedService, PageService) {
        var vm = this;
        vm.shared = SharedService;
        vm.pages = PageService.findPagesByWebsiteId($routeParams.wid);
    }

    function NewPageController(SharedService) {
        var vm = this;
        vm.shared = SharedService;
        vm.createPage = createPage;

        function createPage() {
            console.log('created page', vm.page);
        }
    }

    function EditPageController($routeParams, SharedService, PageService) {
        var vm = this;
        vm.shared = SharedService;
        vm.page = PageService.findPageById($routeParams.pid);
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage() {
            // PageService.updatePage();
            console.log('updated page', vm.page);
        }

        function deletePage() {
            console.log('deleted page', vm.page);
        }
    }

})();
