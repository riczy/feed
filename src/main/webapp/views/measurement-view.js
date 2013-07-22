var Feed = Feed || {};
Feed.View = Feed.View || {};

/**
 * model	Feed.Model.Measurement
 */
Feed.View.MeasurementRow = Backbone.View.extend({
	tagName : 'tr',
	// id: 'measurement-row-' + this.model.id,
	events : {
		"dblclick" : "edit"
	},
	render : function() {
		this.$el.html('<td>' + this.model.get('name') + '</td>');
		return this;
	},
	edit : function() {
		alert("Hello Rhoda?!");
	}
});

/**
 * collection	Feed.Model.MeasurementList
 */
Feed.View.MeasurementTable = Backbone.View.extend({
	tagName : 'table',
	initialize : function() {
		this.rows = [];
	},
	render : function() {
		var html = '';
		for (var i = 0; i < this.collection.length; i++) {
			var rowView = new Feed.View.MeasurementRow({model: this.collection[i]});
			this.rows.push(rowView);
			html += rowView.render();
		}
		this.$el.html(html);
		return this;
	}
});