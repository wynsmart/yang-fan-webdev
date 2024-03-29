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
        var uid = $routeParams.uid;
        WebsiteService.findWebsitesByUser(uid).then(
            res => {
                vm.websites = res.data;
            }
        );
    }

    function NewWebsiteController($location, $routeParams, SharedService, WebsiteService) {
        var vm = this;
        vm.shared = SharedService;
        vm.website = {};
        vm.createWebsite = createWebsite;

        var uid = $routeParams.uid;

        WebsiteService.findWebsitesByUser(uid).then(
            res => {
                vm.websites = res.data;
            }
        );

        function createWebsite() {
            console.log('creating website');
            if (!vm.website.name) {
                vm.error = 'name is required';
                return;
            }
            WebsiteService.createWebsite(uid, vm.website).then(
                res => {
                    vm.websites.push(res.data);
                    $location.url(vm.shared.getRoute('website_list'));
                }
            );
        }
    }

    function EditWebsiteController($location, $routeParams, SharedService, WebsiteService) {
        // TODO: website list sidebar not updated with latest change
        var vm = this;
        vm.shared = SharedService;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        WebsiteService.findWebsitesByUser(uid).then(
            res => {
                vm.websites = res.data;
                for (var website of vm.websites) {
                    if (website._id === wid) {
                        vm.website = website;
                    }
                }
            }
        );
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            console.log('updating website');
            if (!vm.website.name) {
                vm.error = 'name is required';
                return;
            }
            WebsiteService.updateWebsite(vm.website._id, website);
        }

        function deleteWebsite() {
            console.log('deleting website');
            WebsiteService.deleteWebsite(vm.website._id);
            $location.url(vm.shared.getRoute('website_list'));
        }
    }

})();
