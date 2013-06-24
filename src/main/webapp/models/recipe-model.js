var Recipe = Backbone.Model.extend({
	defaults : {
		id : null,
		title : null,
		description : null,
		version : null,
		creationDate : null,
		lastModificationDate : null
	}
});