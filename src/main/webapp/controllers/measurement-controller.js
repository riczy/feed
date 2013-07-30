/**
 * @requires	jquery.js
 * @requires	measurement-model.js
 * @requires	measurement-view.js
 */
$(function() {
	var Measurements = new Feed.Model.MeasurementList;
	var collection = Measurements.fetch();
	var App = new Feed.View.MeasurementTable({el: "#content", collection: collection});
	App.render();
});
