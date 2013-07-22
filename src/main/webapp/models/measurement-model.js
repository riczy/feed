var Feed = Feed || {};
Feed.Model = Feed.Model || {};

Feed.Model.Measurement = Backbone.Model.extend({
	url: '/r/measurements'
});

Feed.Model.MeasurementList = Backbone.Collection.extend({
	model: Feed.Model.Measurement,
	url: '/r/measurements',
	comparator: 'name',
	initialize: function() {
		// invoked upon creation; optional
	}
});