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
        PageService.findPagesByWebsiteId($routeParams.wid).then(
            res => {
                vm.pages = res.data;
            }
        );
    }

    function NewPageController($location, $routeParams, SharedService, PageService) {
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
        vm.page = {};
        vm.createPage = createPage;

        function createPage() {
            console.log('creating page');
            if (!vm.page.name) {
                vm.error = 'name is required';
                return;
            }
            var wid = $routeParams.wid;
            PageService.createPage(wid, vm.page).then(
                res => {
                    $location.url(vm.shared.getRoute('page_list'));
                }
            );
        }
    }

    function EditPageController($location, $routeParams, SharedService, PageService) {
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
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        PageService.findPageById($routeParams.pid).then(
            res => {
                vm.page = res.data;
            }
        );

        var pid = $routeParams.pid;

        function updatePage() {
            console.log('updating page');
            if (!vm.page.name) {
                vm.error = 'name is required';
                return;
            }
            PageService.updatePage(pid, vm.page).then(
                res => {
                    $location.url(vm.shared.getRoute('page_list'));
                }
            );
        }

        function deletePage() {
            console.log('deleting page');
            PageService.deletePage(pid).then(
                res => {
                    $location.url(vm.shared.getRoute('page_list'));
                }
            );
        }
    }

})();
