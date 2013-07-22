/**
 * @requires	jquery.js
 * @requires	measurement-model.js
 * @requires	measurement-view.js
 */
$(function() {
	var Measurements = new Feed.Model.MeasurementList;
	var MeasurementAppView = Backbone.View.extend({
		//el: $("#content"),
		initialize: function() {
			alert("helloooo");
		}
	});
	var App = new MeasurementAppView({el: "#content", collection: Measurements.fetch});
});
