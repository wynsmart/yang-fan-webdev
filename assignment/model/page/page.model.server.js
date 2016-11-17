module.exports = function (db) {
    var PageSchema = require('./page.schema.server')(db);
    var PageModel = db.model('PageModel', PageSchema);
    return {
        createPage: createPage,
        findPageById: findPageById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updatePage: updatePage,
        deletePage: deletePage,
        reorderWidgets: reorderWidgets,
    };

    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }

    function findPageById(pageId) {
        return PageModel.findOne({_id: pageId});
    }

    function findAllWidgetsForPage(pageId) {
        return PageModel.findOne({_id: pageId}).populate('widgets');
    }

    function updatePage(pageId, page) {
        return PageModel.update({_id: pageId}, page);
    }

    function deletePage(pageId) {
        console.log('deleting page:', pageId);
        return PageModel.remove({_id: pageId});
    }

    function reorderWidgets(pageId, newOrders) {
        return PageModel.update({_id: pageId}, {widgets: newOrders});
    }
};
