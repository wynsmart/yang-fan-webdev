(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, SharedService, WidgetService) {
        var vm = this;
        vm.shared = SharedService;
        vm.widgets = WidgetService.findWidgetsByPageId($routeParams.pid);
        vm.getSafeHTML = getSafeHTML;
        vm.getYoutubeSrc = getYoutubeSrc;

        function getSafeHTML(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getYoutubeSrc(widget) {
            console.assert(widget.widgetType === 'YOUTUBE', 'widgetType must be YOUTUBE');
            var video_id = widget.url.split('/').pop();
            var url = `https://www.youtube.com/embed/${video_id}`;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, SharedService) {
        var vm = this;
        vm.shared = SharedService;
    }

    function EditWidgetController($routeParams, SharedService, WidgetService) {
        var vm = this;
        vm.shared = SharedService;
        vm.widget = WidgetService.findWidgetById($routeParams.wgid)
        vm.getTemplateSrc = getTemplateSrc;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function getTemplateSrc() {
            return {
                HEADING: 'views/widget/widget-heading.view.client.html',
                IMAGE: 'views/widget/widget-image.view.client.html',
                YOUTUBE: 'views/widget/widget-youtube.view.client.html',
                HTML: 'views/widget/widget-html.view.client.html',
            }[vm.widget.widgetType];
        }

        function updateWidget() {

        }

        function deleteWidget() {

        }
    }

})();
