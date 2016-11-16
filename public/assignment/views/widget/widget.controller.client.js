(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function WidgetListController($routeParams, $sce, SharedService, WidgetService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'Widgets',
            backBtn: {
                href: 'page_list',
            },
            actionBtn: {
                icon: 'plus',
                href: 'widget_chooser',
            },
        };
        vm.getSafeHTML = getSafeHTML;
        vm.getYoutubeSrc = getYoutubeSrc;
        var pid = $routeParams.pid;
        WidgetService.findWidgetsByPageId(pid).then(
            res => {
                vm.widgets = res.data;
                var sortList = $('.sortable-list');
                sortList.sortable({
                    axis: "y",
                    handle: '.sort-handle',
                    update: (event, ui) => {
                        var newOrder = sortList.sortable('toArray', {attribute: 'wgid'});
                        WidgetService.reorderWidgets(pid, newOrder).then(
                            () => {
                                console.log('reordered widgets:', newOrder);
                            }
                        );
                    },
                });
            }
        );


        function getSafeHTML(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getYoutubeSrc(widget) {
            console.assert(widget.type === 'YOUTUBE', 'widget type must be YOUTUBE');
            var video_id = widget.url.match(/[^=/]+$/);
            var url = `https://www.youtube.com/embed/${video_id}`;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($location, $routeParams, SharedService, WidgetService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'Choose Widget',
            backBtn: {
                href: 'widget_list',
            },
        };
        vm.widget = {};
        vm.createWidget = createWidget;

        var pid = $routeParams.pid;

        function createWidget(widgetType) {
            console.log('creating widget');
            vm.widget.type = widgetType.toUpperCase();
            WidgetService.createWidget(pid, vm.widget).then(
                res => {
                    vm.widget = res.data;
                    $location.url(vm.shared.getRoute('widget_edit', {wgid: vm.widget._id}));
                }
            );
        }
    }

    function EditWidgetController($location, $routeParams, SharedService, WidgetService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'Widget Edit',
            backBtn: {
                href: 'widget_list',
            },
            actionBtn: {
                icon: 'ok',
                click: () => vm.updateWidget(),
            },
        };
        vm.wgUrl = $location.url();

        var wgid = $routeParams.wgid
        WidgetService.findWidgetById(wgid).then(
            res => {
                vm.widget = res.data;
            }
        );
        vm.getTemplateSrc = getTemplateSrc;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function getTemplateSrc() {
            return {
                HEADING: 'views/widget/widget-heading.view.client.html',
                IMAGE: 'views/widget/widget-image.view.client.html',
                YOUTUBE: 'views/widget/widget-youtube.view.client.html',
                HTML: 'views/widget/widget-html.view.client.html',
            }[vm.widget.type];
        }

        function updateWidget() {
            console.log('updating widget');
            WidgetService.updateWidget(wgid, vm.widget).then(
                res => {
                    $location.url(vm.shared.getRoute('widget_list'));
                }
            );
        }

        function deleteWidget() {
            console.log('deleting widget');
            WidgetService.deleteWidget(wgid).then(
                res => {
                    $location.url(vm.shared.getRoute('widget_list'));
                }
            );
        }
    }

    function FlickrImageSearchController($location, $routeParams, SharedService, FlickrService, WidgetService) {
        var vm = this;
        vm.shared = SharedService;
        vm.header = {
            title: 'Search Flickr',
            backBtn: {
                href: 'widget_edit',
            },
        };
        vm.searchText = '';
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos() {
            FlickrService.searchPhotos(vm.searchText).then(
                res => {
                    var data = res.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var widgetId = $routeParams.wgid;
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService.updateWidget(widgetId, {url: url}).then(
                res => {
                    $location.url(vm.shared.getRoute('widget_edit'));
                }
            );
        }
    }

})();
