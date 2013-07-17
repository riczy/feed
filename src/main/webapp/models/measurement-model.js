var Feed = Feed || {};
Feed.Measurement = Feed.Measurement || {};

Feed.Measurement.Model = Backbone.Model.extend({
	url: '/measurements'
});

Feed.Measurement.ModelCollection = Backbone.Collection.extend({
	model: Feed.Measurement.Model,
	url: '/measurements',
	initialize: function() {
		// invoked upon creation; optional
	}
});