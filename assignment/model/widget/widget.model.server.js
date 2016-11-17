module.exports = function (db) {
    var WidgetSchema = require('./widget.schema.server')(db);
    var WidgetModel = db.model('WidgetModel', WidgetSchema);
    return {
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        updateImageUrl: updateImageUrl,
    };

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return WidgetModel.create(widget);
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findOne({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update({_id: widgetId}, widget);
    }

    function deleteWidget(widgetId) {
        console.log('deleting widget:', widgetId);
        return WidgetModel.remove({_id: widgetId});
    }

    function updateImageUrl(widgetId, url) {
        return WidgetModel.update({_id: widgetId}, {url: url});
    }
};
