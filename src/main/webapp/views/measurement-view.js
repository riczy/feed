var Feed = Feed || {};
Feed.Measurement = Feed.Measurement || {};

/**
 * model	Feed.Measurement.Model
 */
Feed.Measurement.RowView = Backbone.View.extend({
	tagName : 'tr',
	//id : 'measurement-view',
	//className : 'measurement',
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
 * collection	Feed.Measurement.ModelCollection
 */
Feed.Measurement.TableView = Backbone.View.extend({
	tagName : 'table',
	initialize : function() {
		this.rows = [];
	},
	render : function() {
		var html = '';
		var rowView = null;
		for (var i = 0; i < this.collection.length; i++) {
			rowView = new Feed.Measurement.RowView({model: this.collection[i]});
			this.rows.push(rowView);
			html += rowView.render();
		}
		this.$el.html(html);
		return this;
	}
});