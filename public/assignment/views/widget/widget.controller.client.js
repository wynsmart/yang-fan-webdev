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
        vm.getTemplateSrc = getTemplateSrc;
        vm.getYoutubeSrc = getYoutubeSrc;

        function getTemplateSrc(widget) {
            return {
                HEADER: 'views/widget/widget-heading.view.client.html',
                IMAGE: 'views/widget/widget-image.view.client.html',
                YOUTUBE: 'views/widget/widget-youtube.view.client.html',
                HTML: 'views/widget/widget-html.view.client.html',
            }[widget.widgetType];
        }

        function getYoutubeSrc(widget) {
            console.assert(widget.widgetType === 'YOUTUBE', 'widgetType must be YOUTUBE');
            var video_id = widget.url.split('/').pop();
            return `https://www.youtube.com/embed/${video_id}`;
        }
    }

    function NewWidgetController($routeParams, SharedService) {
        var vm = this;
        vm.shared = SharedService;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
    }

    function EditWidgetController(SharedService) {
        var vm = this;
        vm.shared = SharedService;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget() {

        }

        function deleteWidget() {

        }
    }

})();
