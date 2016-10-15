(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, SharedService, WidgetService) {
        var vm = this;
        vm.shared = SharedService;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        vm.getSrcByWidget = _getSrcByWidget;

        function _getSrcByWidget(widget){
            return {
                HEADER: 'views/widget/widget-heading.view.client.html',
                IMAGE: 'views/widget/widget-image.view.client.html',
                YOUTUBE: 'views/widget/widget-youtube.view.client.html',
                HTML: 'views/widget/widget-html.view.client.html',
            }[widget.widgetType];
        }
    }

    function NewWidgetController(SharedService) {
        var vm = this;
        vm.shared = SharedService;
    }

    function EditWidgetController(SharedService) {
        var vm = this;
        vm.shared = SharedService;
    }

})();
