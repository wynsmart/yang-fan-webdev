(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, SharedService, PageService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'Pages',
            backBtn: {
                href: 'website_list',
            },
            actionBtn: {
              icon: 'plus',
                href: 'page_new',
            },
        };
        vm.pages = PageService.findPagesByWebsiteId($routeParams.wid);
    }

    function NewPageController(SharedService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'New Page',
            backBtn: {
                href: 'page_list',
            },
            actionBtn: {
                icon: 'ok',
                click: () => vm.createPage(),
            },
        };
        vm.createPage = createPage;

        function createPage() {
            console.log('created page', vm.page);
        }
    }

    function EditPageController($routeParams, SharedService, PageService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'Edit Page',
            backBtn: {
                href: 'page_list',
            },
            actionBtn: {
                icon: 'ok',
                click: () => vm.updatePage(),
            },
        };
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
