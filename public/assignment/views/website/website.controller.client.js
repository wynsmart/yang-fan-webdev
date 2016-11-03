(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, SharedService, WebsiteService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'Websites',
            backBtn: {
                href: 'profile',
            },
            actionBtn: {
                icon: 'plus',
                href: 'website_new',
            },
        };
        WebsiteService.findWebsitesByUser(vm.shared.user._id).then(
            res => {
                vm.websites = res.data;
            }
        );
    }

    function NewWebsiteController($routeParams, SharedService, WebsiteService) {
        var vm = this;
        vm.shared = SharedService;
        vm.website = {};
        vm.websites = WebsiteService.findWebsitesByUser(vm.shared.user._id);
        vm.createWebsite = createWebsite;

        function createWebsite() {
            console.log('creating website');
            WebsiteService.createWebsite(vm.shared.user._id, vm.website).then(
                res => {
                    
                }
            );
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
            console.log('updated website', vm.website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website._id);
            $location.url(vm.shared.getRoute('website_list'));
            console.log('deleted website', vm.website);
        }
    }

})();
