var RecipeView = Backbone.View.extend({
	tagName : 'div',
	id : 'recipe-view',
	className : 'recipe',
	
	render : function() {
		var html = '';
		if (this.model.isNew()) {
			html += '<input id="title" type="text" value="What is the title of your recipe?">' +
				'<textarea id="description" rows="5" cols="70">Tell us about your recipe.</textarea>';
		} else {
			html += '<h2 id="title">' + this.model.get('title') + '</h2>' +
				'<p id="description">' + this.model.get('description') + '</p>';
		}
		$(this.el).html(html);
	}
});
