var b = b || {};
b.ui = b.ui || {};

/**
 * @param	obj {Object} The object in which the attribute resides.
 * 			Required.
 * @param	attribute {String} The name of the attribute on the
 * 			object. Use dot	notation to obtain hierarchy. Examples:
 * 			"address", "address.streetNumber".
 * @return	The value associated with the attribute. If the attribute
 * 			does not exist then undefined is returned. 
 */
b.get = function(obj, attribute) {
	
	if (b.isNone(attribute)) return undefined;
	
	var attributeArray = attribute.split(".");
	var tempObj = obj;
	for (var i = 0; i < attributeArray.length && (!b.isNone(tempObj)); i++) {
		tempObj = tempObj[attributeArray[i]];
	}
	return tempObj;
};

/**
 * <p>Sets an attribute on an object to the value given. If the
 * object or attribute parameters are "none" then no setting
 * occurs.</p>
 * 
 * <p>If the attribute does not exist on the object then it is
 * created and set to the given value.</p>
 * 
 * @param	obj {Object} The object in which the attribute resides.
 * 			Required.
 * @param	attribute {String} The name of the attribute on the
 * 			object. Use dot	notation to obtain hierarchy. Examples:
 * 			"address", "address.streetNumber". If the attribute
 * 			does not exist then it is created. Required.
 * @param	value {Object} The value given to the attribute.
 * 			
 */
b.set = function(obj, attribute, value) {
	
	var attributeArray = attribute.split(".");
	var key = attributeArray[0];
	if (attributeArray.length == 1) {
		obj[key] = value;
	}
	else {
		if (obj[key] === undefined || obj[key] === null) {
			obj[key] = {};
		}
		attributeArray.shift();
		b.set(obj[key], attributeArray.join("."), value);
	}
};

/**
 * <p>Gets the value of a page element that has an ID equal to the
 * given parameter elementId.</p>
 * 
 * <p>If no element exists with an id of elementId then null is
 * returned.
 * If the element does exist but its value is empty, null or
 * undefined then null is returned.</p>
 * 
 * @param 	elementId {String} The id of the element whose value is
 * 			returned. Required.
 * @return	The value associated with the element identified by the
 * 			parameter elementId. Empty and undefined values are
 * 			converted to null.
 */
b.getElementValue = function(elementId) {
	
	return b.clean($('#' + elementId).val());
};

/**
 * <p>If the value given is a string then it is trimmed of white space.
 * If the value is undefined then null is returned.</p>
 * 
 * @param	value {Object} The value that is cleaned. Optional.
 */
b.clean = function(value) {
	
	var cleanValue = (typeof value == "string") ? $.trim(value) : value;
	return b.isNone(cleanValue) ? null : cleanValue;
};

/**
 * <p>Returns the value for the element identified by the id
 * given for the property identified by propName.</p>
 * 
 * @param 	elementId The id of the element whose property is
 * 			returned.
 * @param	propName The name of the property whose value is to be
 * 			returned.
 * @return	The value of the propName associated with the element.
 * 			If no element or element property is found then null is
 * 			returned.
 */
b.getElementProperty = function(elementId, propName) {
	
	var element = document.getElementById(elementId);
	if (b.isNone(element)) return null;
	
	var elementValue = element[propName];
	if (b.isNone(elementValue)) return null;
	
	return elementValue;
};

/**
 * <p>Returns true if the given obj parameter is neither undefined
 * nor null. Returns false if the given obj parameter is undefined
 * or null.</p>
 * 
 * @param	obj {Object} An object or element.
 * @return	true if obj has a value and false if obj is undefined
 * 			or null.
 */
b.isNone = function(obj) {
	
	return (obj===undefined || obj===null); 
};

/**
 * <p>Returns true if obj is of type string and it has an empty
 * string value. In addition, returns true if obj is undefined or
 * null. Returns false in all other cases.
 * 
 * @param	obj An object or element.
 * @return	true if obj is an empty string or if obj is undefined or
 * 			null; false otherwise.
 */
b.isEmpty = function(obj) {
	
	if (b.isNone(obj)) return true;
	
	if (typeof obj == "string") {
		return $.trim(obj).length == 0;
	}
	
	return false;
};

/**
 * <p>Takes a string and returns the representative boolean value.
 * The following values, not case sensitive, return false: empty
 * string, undefined, null, "0", "f", "false", "n", "no", "off",
 * "null".
 * All other values return true.</p>
 * 
 * @param	boolString {String} A string that is converted to a boolean.
 * @return	The boolean value that represents the given string.
 */
b.toBoolean = function(boolString) {
	
	var boolString = b.noneToEmpty(boolString);
	boolString = boolString.trim().toUpperCase();
	
	return ((boolString == "" || boolString == "0" || 
			boolString == "F" || boolString == "FALSE" ||
			boolString == "N" || boolString == "NO" || 
			boolString == "OFF" || boolString == "NULL") ? false : true);
};

/**
 * <p>If the given obj is undefined or null then returns an empty
 * string. Otherwise, returns the obj unchanged.</p>
 */
b.noneToEmpty = function(obj) {
	
	if (b.isNone(obj)) return "";
	return obj;
};

/**
 * <p>Lists the property names and values of element and prints them
 * to the html element with an id of printToElementId.</p>
 * 
 * <p>Options:</p>
 * content - The content to print. Optional.
 * elementId - The id of the element where the content is printed.
 * 		If not provided then the content is appended to the body
 * 		tag. Optional.
 * title - A header title to print in a line prior to the printing
 * 		of the content. Optional.
 *
 * @param	options - {Object} Options for printing the content in
 * 			the desired format and location. Optional.
 */
b.print = function(options) {
	
	function printUndefined() {
		html += "[ undefined ]";
	}
	
	function printNull() {
		html += "[ null ]";
	}
	
	function printFunction() {
		html += "[ function ]";
	}
	
	function printOther(o) {
		html += (o);
	}
	
	function printObject(o)	{
		html += "<ol>";
		for (var prop in o) {
			var propObj = o[prop];
			html += "<li>" + prop + ":  ";
			if (typeof propObj == "undefined") printUndefined();
			else if (propObj == null) printNull();
			else if (typeof propObj == "function") printFunction();
			else if (typeof propObj == "object") printObject(propObj);
			else printOther(propObj);
			html += "</li>";
		}
		html += "</ol>";
	}
	
	var html = "";
	
	if (b.isNone(options)) var options = {};
	options.elementId = b.isNone(options.elementId) ? "body" : "#" + options.elementId;
	
	if (typeof options.content == "undefined") printUndefined();
	else if (options.content == null) printNull();
	else if (typeof options.content == "function") printFunction();
	else if (typeof options.content == "object") printObject(options.content);
	else printOther(options.content);
	
	if (!b.isNone(options.title)) {
		$(options.elementId).append("<div><em>" + options.title + "</em></div>");
	}
	
	$(options.elementId).append(html);
};

/**
 * <p>Makes a copy of the given object and returns it.</p>
 * 
 * <p>NOTE: This function does not copy over functions. It is
 * considered a light copy.</p>
 * 
 * @param	obj {Object} The object to copy.
 */
b.copy = function(obj) {
	
    if (obj == undefined || obj == null || typeof(obj) != 'object') return obj;
    
    var temp = new obj.constructor();
    for(var key in obj) {
        temp[key] = b.copy(obj[key]);
    }
    
    return temp;
};

/**
 * <p>Moves the focus to the nextElementId when field's maximum
 * length is reached.</p>
 * 
 * @param	field - Required - The field with the maximum length.
 * @param	nextElementId - Required - The id of the field that is
 * 			given focus.
 */
b.ui.moveOnMax = function(field, nextElementId) {
	
	if (field.value.length >= field.maxLength) {
		document.getElementById(nextElementId).focus();
	}
};

/**
 * <p>For a select field that is identified by the elementId,
 * selects the option that matches the given value.</p>
 * 
 * @param	elementId - {String} The id of the element. The element
 * 			is a select field. Required.
 * @param	value - {String} The option value in the select field
 * 			that is selected.
 */
b.ui.selectOption = function(elementId, value) {
	
	var element = document.getElementById(elementId);
	if (b.isNone(element)) return;
	
	for (var i = 0; i < element.options.length; i++) {
		element.options[i].selected = (element.options[i].value == value);
	}
};

/**
 * <p>Return the selected options of the select element identified by
 * elementId. If no options are selected or if the element does not
 * exist then an empty array is returned. Otherwise, all selected
 * option values are returned in an array.</p>
 * <p>Empty select values are ignored under the assumption that it is
 * not a true value in the select field but, instead, a blank field
 * to represent no selection.</p>
 * 
 * 
 * @param	elementId - {String} The id of the element. The element
 * 			is a select field. Required.
 * @return	An array of values, each representing a selected option.
 * 			An empty array is returned for no selected options or a
 * 			non-existing element.
 */
b.ui.getSelectedOptions = function(elementId) {
	
	var selected = [],
		element = document.getElementById(elementId);

	if (!b.isNone(element)) {
		for (var i = 0; i < element.options.length; i++) {
			if (element.options[i].selected && !b.isEmpty(element.options[i].value)) {
				selected.push(element.options[i].value);
			}
		}
	}
	
	return selected;
};

/**
 * Clear checkboxes. 
 */
b.ui.clearInput = function(elementName) {
	
	var elements = document.getElementsByName(elementName);
	if (b.isNone(elements)) return;
	
	for (var i = 0; i < elements.length; i++) {
		elements[i].checked = false;
	}
};

/**
 * Return values of checkboxes that are checked.
 */
b.ui.getSelectedInput = function(elementName) {
	var selected = [],
		elements = document.getElementsByName(elementName);
	
	if (!b.isNone(elements)) {
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].checked) {
				selected.push(elements[i].value);
			}
		}
	}
	
	return selected;
};

/**
 * @param	options {Object} Indicates how to load the options for
 * 			a select element. Required.
 * 
 * @param	objArray {Array} An array of objects that are used to
 * 			fill out the select options. If not provided the 
 * @param	targetId {String} The id of select element in which the
 * 			options are loaded. 
 * @param	valueObjAttribute {String} The name of the attribute in
 * 			the object that is used for the key value. If the attribute
 * 			name is in an object hierarchy then use dot notation to
 * 			designate the attribute (i.e., foo.name).  If not provided 
 * 			then the object's toString value is used. Optional.
 * @param	displayObjAttribute {String | Function} The name of the
 * 			the attribute in the object that is used for the display
 * 			text or a function that is used to generate the display
 * 			text.
 * 			For String input, if the display attribute is in an
 * 			object hierarchy then use dot notation to designate the
 * 			attribute (i.e., foo.name).
 * 			For Function input, the given function is passed an
 * 			element from the objArray parameter. The function must
 * 			return a string to display.
 * 			If no value is given then the object's toString value is
 * 			used.
 * 			Optional.
 * @param	includeBlankOption {Boolean} Indicates if a blank option
 * 			is included in the list. Defaults to false. Optional.
 * @param	valueSelected {String} The option that is selected upon
 * 			loading. If no matching value exists then nothing is
 * 			selected. Optional.
 */
b.ui.loadOptions = function(options) {
	var options = options || {};
	if (b.isNone(options.targetId)) return;
	
	options.objArray = options.objArray || [];
	options.includeBlankOption = options.includeBlankOption || false;
	
	var html = options.includeBlankOption ? '<option value=""></option>' : '',
		hasValAttr = !b.isEmpty(options.valueObjAttribute),
		hasDisplayAttr = !b.isEmpty(options.displayObjAttribute),
		obj, value, display, i;
	var isDisplayAttrFn = hasDisplayAttr && $.isFunction(options.displayObjAttribute);
	
	for (i = 0; i < options.objArray.length; i++) {
		obj = options.objArray[i];
		value = hasValAttr ? b.get(obj, options.valueObjAttribute) : obj;
		display = hasDisplayAttr ? (isDisplayAttrFn ? options.displayObjAttribute(obj) : b.get(obj, options.displayObjAttribute)) : obj;
		html += '<option ' +
			((!b.isNone(options.valueSelected) && options.valueSelected == value) ? 'selected ' : '') +
			'value="' + value + '">' + display + '</option>';
	}
	$('#' + options.targetId).empty().append(html);
};

/**
 * @param	options.targetId
 * @param	options.elementLabel
 * @param	options.labelClass
 * @param	options.elementName
 * @param	options.objArray
 * @param	options.valueObjAttribute
 * @param	options.displayObjAttribute
 * @param	options.width
 * @param	options.orientation : horizontal (default) | vertical
 */
b.ui.multiSelect = function(options) {
	var options = options || {};
	if (b.isNone(options.targetId)) return;

	options.objArray = options.objArray || [];
	var hasValAttr = !b.isEmpty(options.valueObjAttribute),
		hasDisplayAttr = !b.isEmpty(options.displayObjAttribute),
		isHorizontal = b.isEmpty(options.orientation) || options.orientation == "horizontal",
		obj, value, display, id, i, html = '';

	if (isHorizontal) {
		html += '<label' + 
			(b.isEmpty(options.labelClass) ? '' : ' class="' + options.labelClass + '"') +
			'>' + options.elementLabel + '</label>';
	}
	else {
		if (!b.isNone(options.elementLabel)) {
			html += '<p>' + options.elementLabel + '</p>';
		}
	}
	
	html += '<div class="b-checklist-group ' + (isHorizontal ? 'b-inline' : 'b-block') + '">';
	for (i = 0; i < options.objArray.length; i++) {
		obj = options.objArray[i];
		id = options.elementName + i;
		value = hasValAttr ? b.get(obj, options.valueObjAttribute) : obj;
		display = hasDisplayAttr ? b.get(obj, options.displayObjAttribute) : obj;
		html += '<span class="b-checklist-item ' + (isHorizontal ? 'b-inline' : 'b-block') + '">';
		html += '<input type="checkbox" id="' + id +
			'" name="' + options.elementName + '" ' +
			'value="' + value + '">' +
			'<label for="' + id + '">' + display + '</label></span>';
	}
	
	html += '</div>';
	$('#' + options.targetId).empty().append(html);
};


/**
 * @param	options.targetId
 * @param	options.elementName
 * @param	options.objArray
 * @param	options.valueObjAttribute
 * @param	options.displayObjAttribute
 * @param	options.width
 * @param	options.orientation : horizontal (default) | vertical
 */
b.ui.checklist = function(options) {
	var options = options || {};
	if (b.isNone(options.targetId)) return;

	options.objArray = options.objArray || [];
	var hasValAttr = !b.isEmpty(options.valueObjAttribute),
		hasDisplayAttr = !b.isEmpty(options.displayObjAttribute),
		isHorizontal = b.isEmpty(options.orientation) || options.orientation == "horizontal",
		obj, value, display, id, i;
	
	var html = '<div class="b-multiselect"';
	if (!b.isEmpty(options.width)) {
		html += ' style="width: ' + options.width + ';"';
	}
	html += '>';
	
	if (isHorizontal) {
		html += '<label>' + options.elementLabel + '</label><span>';
	}
	else {
		if (!b.isNone(options.elementLabel)) {
			html += '<p>' + options.elementLabel + '</p>';
		}
	}
	
	for (i = 0; i < options.objArray.length; i++) {
		obj = options.objArray[i];
		id = options.elementName + i;
		value = hasValAttr ? b.get(obj, options.valueObjAttribute) : obj;
		display = hasDisplayAttr ? b.get(obj, options.displayObjAttribute) : obj;
		if (!isHorizontal) html += '<div>';
		html += '<input type="checkbox" id="' + id +
			'" name="' + options.elementName + '" ' +
			'value="' + value + '">' +
			'<label for="' + id + '">' + display + '</label>';
		if (!isHorizontal) html += '</div>';
	}
	
	html += '</div>';
	$('#' + options.targetId).empty().append(html);
};

/**
 * Date object extension. 
 */
Date.prototype.toDisplayString = function() {
	
	return (this.getMonth()+1) + "/" + this.getDate() + "/" + this.getFullYear();
};

/**
 * <p>Given a date representation in milliseconds or date string
 * converts the representation into a Date object.</p>
 * <p>If the parameter is already a Date object then that object
 * is returned.</p>
 * 
 * @param	aDate {String || Number} The date representation to
 * 			convert into a Date object. Optional.
 * @return	A Date object containing the value that equals the given
 * 			representation. If neither a string or number was passed
 * 			in then returns the given parameter representation
 * 			unchanged.
 */
b.asDate = function(aDate) {
	
	if (b.isNone(aDate)) return aDate;
	if (typeof aDate == 'number') return new Date(aDate);
	if (typeof aDate == 'string') return new Date(aDate);
	return aDate;
};

/**
 * <p>Places an object of criteria into a url to be used for
 * search for resource items.</p>
 * 
 * Examples:
 * resourceUrl = /app/r/rsrc
 * criteria = {} or null or undefined
 * return = /app/r/rsrc
 * 
 * criteria = { status : [1, 3], name : "Henry" }
 * return = /app/r/rsrc?status=1&status=3&name=Henry
 * 
 * criteria = { status : null }
 * return = /app/r/rsrc
 * 
 * @param	resourceUrl - {String} The url of the resource for which
 * 			this url is being expanded with search criteria. For
 * 			example: /app-name/r/resource-name. Required.
 * @param	criteria - {Object} An object containing names and
 * 			values of the criteria to use for searching a resource.
 * 			For example: { status : [1, 3], name : "Henry" }
 * @return	A url that combines the given resourceUrl and the criteria.
 */
b.asSearchUri = function(resourceUrl, criteria) {
	
	var key, value, temp, i, 
		hasInitialCriterion = false,
		url = resourceUrl,
		criteria = criteria || {};
	
	for (key in criteria) {
		temp = "";
		value = criteria[key];
		if (!b.isNone(value)) {
			if (typeof value === 'object' && value instanceof Array && value.length > 0) {
				/* 
				 * MULTIPLE VALUES SEPARATED BY ","; THIS WAY IS NOT BEING HANDLED BY REST.
				for (i = 0; i < value.length; i++) {
					if (i > 0) temp += ",";
					temp += encodeURIComponent(value[i]);
				}
				if (!b.isEmpty(temp)) temp = key + "=" + temp;
				*/
				for (i = 0; i < value.length; i++) {
					if (i > 0) temp += "&";
					temp += (key + "=" + encodeURIComponent(value[i]));
				}
			}
			else {
				temp = key + "=" + encodeURIComponent(value);
			}
			
			if (!b.isEmpty(temp)) {
				if (!hasInitialCriterion) {
					url += "?" + temp;
					hasInitialCriterion = true;
				}
				else {
					url += "&" + temp;
				}
			}
		}
	}
	
	return url;
};

/**
 * <p>Model</p>
 *
 * <p>The parent template for creating a model object. This object
 * contains generic functionality for manipulating a model and
 * should be extended by specific model types. The following
 * functions must be overridden upon extension: getObject, setObject,
 * and getUrl.</p>
 * 
 * @return	The model instance.
 */
b.model = function() {
	this._backup = null;
	this._isModified = null;
	this._onSuccess = null;
	this._onError = null;
	return this;
};
b.model.prototype = {
	// Override
	getObject : function() {
		throw new Error("The getObject function is not implemented");
	},
	// Override
	setObject : function(data) {
		throw new Error("The setObject function is not implemented");
	},
	// Override
	getUrl : function() {
		throw new Error("The getUrl function is not implemented");
	},
	getUid : function() {
		return this.id;
	},
	/**
	 * <p>Answers true if this model instance is new and false the model
	 * represents an instance that has already been persisted.</p>
	 * 
	 * @return {Boolean} true if this model instance is new and false if
	 * 			not.
	 */
	isNew : function() {
		return (this.id === null);
	},
	/**
	 * <p>Answers true if this instance has been modified since its last
	 * update and false if it has not.</p>
	 * 
	 * @return	{Boolean} true if this instance has been modified since
	 * 			its last update and false if it has not.
	 */
	isModified : function() {
		return this._isModified;
	},
	set : function(attribute, value) {
		var currentValue = this.get(attribute);
		var newValue = b.clean(value);
		
		if (currentValue !== newValue) {
			this._isModified = true;
			if (!this.isNew() && this._backup == null) {
				this._backup = b.copy(this.getObject());
			}
			b.set(this, attribute, newValue);
		}
	},
	setBoolean : function(attribute, value) {
		if (b.isNone(value) || b.isEmpty(value)) {
			value = null;
		} else {
			value = b.toBoolean(value);
		}
		this.set(attribute, value);
	},
	get : function(attribute) {
		return b.get(this, attribute);
	},
	getd : function(attribute) {
		return b.noneToEmpty(this.get(attribute)).toString();
	},
	getdDate : function(attribute) {
		var value = this.get(attribute), ds;
		if (value instanceof Date) {
			ds = (value.getMonth()+1) + '/' +
				value.getDate() + '/' +
				value.getFullYear();
		} else {
			ds = this.getd(attribute);
		}
		return ds;
	},
	getdTimestamp : function(attribute) {
		var value = this.get(attribute), ds;
		if (value instanceof Date) {
			ds = (value.getMonth()+1) + '/' +
				value.getDate() + '/' +
				value.getFullYear() + ' ' +
				(value.getHours()+1) + ':' +
				(value.getMinutes() <= 10 ? '0' + value.getMinutes() : value.getMinutes()) + ':' +
				(value.getSeconds() <= 10 ? '0' + value.getSeconds() : value.getSeconds());
		} else {
			ds = this.getd(attribute);
		}
		return ds;
	},
	getdMoney : function(attribute) {
		return this.getd(attribute);
	},
	revert : function() {
		// Should anything be done if this is a "new" instance (and, thus, no backup exists)?
		if (this._backup != null) {
			this.setObject(this._backup);
			this._backup = null;
			this._isModified = false;
		}
	},
	refresh : function() {
		$.ajax({
			type : "GET",
			url : this.getUrl() + "/" + getUid(),
			success : $.proxy(function(data) {
				this.setObject(data);
				if (this._backup != null) {
					this._backup = b.copy(this.getObject());
				}
			}, this),
			error : function() {
				alert("error");
			}
		});
	},
	save : function(onSuccess, onError) {
		this._onSuccess = onSuccess;
		this._onError = onError;
		$.ajax({
			type : this.isNew() ? "PUT" : "POST",
			url : this.getUrl(),
			contentType : "application/json",
			data : JSON.stringify(this.getObject()),
			dataType : "json",
			success : $.proxy(this.postSaveSuccess, this),
			error : $.proxy(this.postSaveError, this)
		});
	},
	remove : function(onSuccess, onError) {
		var options = {
			type : "DELETE",
			url : this.getUrl() + "/" + this.getUid(),
			contentType : "text/html"
		};
		if (!b.isNone(onSuccess)) options.success = onSuccess;
		if (!b.isNone(onError)) options.error = onError;
		$.ajax(options);
	},
	postSaveSuccess : function(data, status, xhr) {
		this.setObject(data);
		this._backup = null;
		this._isModified = false;
		if (!b.isNone(this._onSuccess)) {
			this._onSuccess(data, status, xhr);
			this._onSuccess = null;
		}
	},
	postSaveError : function(xhr, status, error) {
		if(!b.isNone(this._onError)) {
			this._onError(xhr, status, error);
			this._onError = null;
		}
	}
};

/**
 * <p>The parent template for creating a form object. This object
 * contains generic functionality for manipulating a form. Several
 * functions must be overridden prior to use.</p>
 * <p>This template creates a block element in which the form ui
 * details are rendered. The element id is referenced by the method
 * getComponentId.</p>
 *
 * @param	options.targetId {String} The id of the element where the
 * 			form is rendered. Required.
 * @param	options.model {b.model} An instance of the model that the
 * 			form is representing. If no model is provided then assume
 * 			that the form represents a new instance.
 * @return	This form instance.
 */
b.form = function(options) {
	if (!options.targetId) {
		throw new Error("The targetId option is required.");
	}
	this._oid = new Date().getTime();
	this._closeObservers = [];
	this._saveObservers = [];
	this._model = options.model;
	this._isAddMode = options.model.isNew();
	this._confirmDialogId = "cfmDialog" + this._oid;
	this._componentId = "form" + this._oid;
	
	$("#" + options.targetId).append('<div id="' + this._componentId + '"><div id="' + this._confirmDialogId + '"></div></div>');
	return this;
};
b.form.prototype = {
	getOid : function() {
		return this._oid;
	},
	getModel : function() {
		return this._model;
	},
	getComponentId : function() {
		return this._componentId;
	},
	isAddMode : function() {
		return this._isAddMode;
	},
	/**
	 * <p>Adds an observer of this form's successful save action.
	 * After a successful save occurs the method is executed in the
	 * given context.</p>
	 *  
	 * @param	context {Object} The object or context under which
	 * 			the method is run. All "this" references in method
	 * 			will refer to the context instance. Required.
	 * @param	methodName {String} The name of the function to run
	 * 			upon a successful save. The function is run in the
	 * 			given context. Required.
	 * @param	data {Object} Key and value pairs of data that is
	 * 			passed into the method. Optional.
	 */
	addSaveObserver : function(context, methodName, data) {
		this._saveObservers.push({
			context : context,
			methodName : methodName,
			data : data
		});
		return this;
	},
	addCloseObserver : function(context, methodName, data) {
		this._closeObservers.push({
			context : context,
			methodName : methodName,
			data : data
		});
		return this;
	},
	callObserver : function(obs) {
		if (typeof obs.methodName == "function") {
			obs.methodName.call(obs.context, obs.data);
		}
		else {
			obs.context[obs.methodName](obs.data);
		}
	},
	initialize : function() {
		this.buildConfirmation();
		this.buildForm();
		if (this.isAddMode()) {
			this.adjustForAdd();
		} else {
			this.adjustForEdit();
		}
	},
	buildConfirmation : function() {
		$('#' + this._confirmDialogId)
		.append("You have made changes that have not been saved. Would you like to save before closing?")
		.dialog({
			autoOpen : false,
			modal : true,
			title : "Save before closing?",
			buttons : {
				'Yes' : $.proxy(
					function() {
						this.save();
						this.close();
					}, this),
				'No' : $.proxy(
					function() {
						this._model.revert();
						this.close();
					}, this),
				'Cancel' : $.proxy(
					function() {
						this.closeConfirmation();
					}, this)
			}
		});
	},
	// Override Optional
	buildForm : function() {
	},
	// Override Required
	open : function() {
		throw new Error("The open function must be implemented");
	},
	// Override Optional
	adjustForEdit : function() {
	},
	/**
	 * <p>Activates the closing process of this form. This action
	 * includes the activation of a confirmation window, if the
	 * form data is modified, 
	 */
	closeAction : function() {
		if (this._model.isModified()) {
			$('#' + this._confirmDialogId).dialog('open');
			return false;
		}
		this.close();
		return true;
	},
	closeConfirmation : function() {
		$('#' + this._confirmDialogId).dialog('close');
	},
	/**
	 * <p>Closes this form by, first, notifying all close observers
	 * and, second, by removing the rendering of this form component
	 * and its child components from the target element under which
	 * it was drawn.</p>
	 */
	close : function() {
		for (var i = 0; i < this._closeObservers.length; i++) {
			this.callObserver(this._closeObservers[i]);
		}
		$('#' + this._confirmDialogId).remove();
		$('#' + this._componentId).remove();
	},
	save : function() {
		this._model.save(
			$.proxy(this.postSave, this),
			function() {}
		);
	},
	postSave : function() {
		for (var i = 0; i < this._saveObservers.length; i++) {
			this.callObserver(this._saveObservers[i]);
		}
		if (this._isAddMode) {
			this.adjustForEdit();
			this._isAddMode = false;
		}
	}
};

/**
 * <p>Table</p>
 *
 * <p>A generic representation of a table that is expected to contain
 * zero or more rows of model objects (see b.row).
 *
 * <p>All extensions should call initialize after extending to
 * initiate the set up of the table instance.</p>
 *
 * @param	targetId {String} The id of the element to which this
 *			component is appended. Required.
 * @param	omitBodyElement {Boolean} Defaults to false. A true
 * 			value indicates that there should be no distinction
 * 			between the component and body elements while false
 * 			indicates that there is a distinct body element.
 * 			Typically, if a table element is being constructed then
 * 			a body element should be present. But, if rows of other
 * 			elements are used to construct a table (i.e., divs) then
 * 			a body may not be necessary. Optional.
 */
b.table = function(options) {
	if (!options || !options.targetId) {
		throw new Error("The targetId option is required.");
	}
	this._oid = new Date().getTime();
	this._bodyId = "body" + this._oid;
	this._componentId = "table" + this._oid;
	this._targetId = options.targetId;
	this._omitBodyElement = options.omitBodyElement;
	return this;
};
b.table.prototype = {
	getOid : function() {
		return this._oid;
	},
	getBodyId : function() {
		return this._omitBodyElement ? this.getComponentId() : this._bodyId; 
	},
	getComponentId : function() {
		return this._componentId;
	},
	getTargetId : function() {
		return this._targetId;
	},
	initialize : function() {
		this.build();
	},
	// Constructs the table and appends it to the element identified by the target id.
	build : function() {
		throw new Error("The build function must be implemented.");
	},
	// Destroys all the rows in the table.
	clear : function() {
		$('#' + this._bodyId).empty();
	},
	// Fills the table with the given data. The data is an array of raw objects for this table. New row isntances are created. see @createRowObject
	fill : function(data) {
		if (data) {
			for (var i = 0; i < data.length; i++) {
				var model = this.createModel(data[i]);
				this.createRow(model);
			}
		}
	},
	/**
	 * <p>Adds a new row to this table instance and puts the row into
	 * edit mode. If no model is given then a new model instance is
	 * created. By default the row is inserted as the first row.</p>
	 * 
	 * @param	options.model {b.model} The model instance that the
	 * 			new row will represent. The model must be the model
	 * 			type support by the table instance. If no model is
	 * 			given then a new instance is created. Optional.
	 * @param	options.prepend {boolean} True if the row should be
	 * 			inserted in the first row position and false if it
	 * 			should be the last position. By default this value
	 * 			is true. Optional.
	 * @param	options.rowEditOptions {Object} An object of options
	 * 			that are passed on to the table row's edit function.
	 * 			Optional.
	 * @return	The new row instance that is added to this table.
	 */
	newRow : function(options) {
		var options = options || {};
		var model = b.isNone(options.model) ? this.createModel() : options.model;
		var prepend = b.isNone(options.prepend) ? true : options.prepend;
		var row = this.createRow(model, prepend);
		row.edit(options.rowEditOptions);
		return row;
	},
	// Creates and returns the row model that this table uses. If dataObject is null then creates new instance of model. 
	createModel : function(dataObject) {
		throw new Error("The createModel function must be implemented");
	},
	// Creates and returns a row instance for this table
	createRow : function(model, prepend) {
		throw new Error("The createRow function must be implemented.");
	},
	show : function() {
		('#' + this._componentId).show();
	},
	hide : function() {
		('#' + this._componentId).hide();
	},
	destroy : function() {
		('#' + this._componentId).remove();
	}
};

/**
 * <p>Table Row</p>
 * 
 * <p>The generic template for creating a table row. Extend this
 * object to access generic functionality associated with this
 * framework's table and rows.</p>
 * 
 * @param	options.table {b.table} The table object in which this
 * 			row is a part. Required.
 * @param	options.model {b.model} The model instance that this row
 * 			represents. Required.
 * @param	options.prepend {Boolean} Answers true if the row is
 * 			added to the table in the first position and false if
 * 			the row is added to the table in the last position.
 * 			Defaults to true. Optional.
 */
b.row = function(options) {
	this._oid = new Date().getTime();
	if (!options.table) {
		throw new Error("The row options must contain the parent table.");
	}
	if (!options.model) {
		throw new Error("The row options must contain a model.");
	}
	this._componentId = "row" + this._oid;
	this._table = options.table;
	this._model = options.model;
	return this;
};
b.row.prototype = {
	getOid : function() {
		return this._oid;
	},
	getModel : function() {
		return this._model;
	},
	getComponentId : function() {
		return this._componentId;
	},
	// Returns the table object with which this row is associated.
	getTable : function() {
		return this._table;
	},
	// Builds and add this row to the table and put it in view mode.
	initialize : function(prepend) {
		this.build(prepend);
		this.view();
	},
	// Builds the row shell. If prependRow is missing or false then row is appended to table; otherwise it is added as first row.
	build : function(prepend) {
		throw new Error("The build function must be implemented");
	},
	// The appearance & behavior actions when the row is in view mode.
	view : function() {
	},
	// The appearance & behavior actions to take when the row is in edit mode. 
	edit : function() {
	},
	// Refreshes the row's cells with the corresponding model's attribute values. 
	refresh : function() {
	},
	// Saves the model and calls view afterwards
	save : function() {
		this._model.save(
				$.proxy(this, "view"), 
				function(xhr, status, error) { 
					alert("save failure"); 
				}
			);
	},
	// Cancels any model updates. If the row model is new then removes it.
	cancel : function() {
		if (this._model.isNew()) {
			this.destroy();
		} else {
			this._model.revert();
			this.view();
		}
	},
	// Deletes the domain instance associated with this row. 
	remove : function() {
		this._model.remove(
				$.proxy(this, "destroy"), 
				function(xhr, status, error) {
					alert("remove failure");
				}
			);
	},
	// Shows the row
	show : function() {
		('#' + this._componentId).show();
	},
	// Hides the row
	hide : function() {
		('#' + this._componentId).hide();
	},
	// Removes the row from the table.
	destroy : function() {
		$('#' + this._componentId).remove();
	}
};


b.criteriaForm = function(options) {
	if (!options.targetId) {
		throw new Error("The targetId option is required.");
	}
	this._oid = new Date().getTime();
	this._componentId = "criteriaForm" + this._oid;
	
	$("#" + options.targetId).append('<div id="' + this._componentId + '"></div>');
	return this;
};
b.criteriaForm.prototype = {
	getOid : function() {
		return this._oid;
	},
	getComponentId : function() {
		return this._componentId;
	},
	show : function() {
		$('#' + this._componentId).show();
	},
	hide : function() {
		$('#' + this._componentId).hide();
	},
	initialize : function() {
		this.build();
	},
	// Override
	getCriteria : function() {
		return {};
	},
	// Override
	clear : function() {
	},
	// Override
	build : function() {
	}
};


/**
 * <p>Search Bar</p>
 * 
 * <p>The search bar is a compact searching mechanism that applied
 * to the current page. The search bar is expected to contain:
 * a) a quick search input text box that allows the user to perform
 * a general text or number search,
 * b) a corresponding quick search button that executes the quick
 * search,
 * c) an advanced search link to allow the user to execute a
 * specific search, and
 * d) a default filter link that establishes what is presented upon
 * page initiation.
 * </p>
 * 
 * @param	options.targetId Required
 * @param	options.hasAdvancedSearch Optional Defaults to false
 * @param	options.hasDefaultFilter Optional Defaults to false
 */
b.searchbar = function(options) {
	
	if (!options.targetId) {
		throw new Error("The targetId option is required.");
	}
	
	this._oid = new Date().getTime();
	this._componentId = "searchbar" + this._oid;
	this._resultsSectionId = "searchResultsArea" + this._oid;
	this._searchbarInputAreaId = "searchbarInputArea" + this._oid;
	this._searchbarOptionsAreaId = "searchbarOptionsArea" + this._oid;
	this._searchTextId = "searchInput" + this._oid;
	this._searchButtonId = "searchButton" + this._oid;
	this._advSearchLinkId = "advSearchLink" + this._oid;
	this._defaultFilterLinkId = "defaultFilterLink" + this._oid;
	
	var html = '<div id="' + this._componentId + '" class="b-actionbar">' +
		'<div id="' + this._searchbarInputAreaId + '" class="b-column">' +
		'<input id="' + this._searchTextId + '" type="search" size="35"/>' +
		'<button id="' + this._searchButtonId + '" title="Search">Search</button>' +
		'</div>' +
		'<div id="' + this._searchbarOptionsAreaId + '" class="b-right-aligned">' +
		'<a href="#" id="' + this.advSearchLinkId + '">Advanced Search</a>&nbsp;' +
		'<a href="#" id="' + this.defaultFilterLinkId + '">Default Filter</a>' +
		'</div>' +
		'<div id="' + this._resultsSectionId + '"></div>' + 
		'</div>';
	
	$('#' + options.targetId).append(html);
	
	return this;
};
b.searchbar.prototype = {
	initialize : function() {
		this._table = this.createTable(this._resultsSectionId);
		$('#' + this._searchButtonId).bind('click', $.proxy(
					function() {
						this.search(
								this.getSearchText(),
								$.proxy(
									function(data) {
										this.clear();
										this.fill(data);
									},
									this.getTable()
								),
								function() { alert("error"); }
							);
					},
					this));
	},
	/**
	 * <p>Returns the text that is present in the general search text
	 * box. An object is returned with one attribute called "text"
	 * that contains the search text value. If no value exists in the
	 * search text box then an empty string is returned.</p>
	 * 
	 * @return	Object containing one attribute called "text" that has
	 * 			the value present in the search text box. An empty
	 * 			string is returned if no value is present.
	 */
	getSearchText : function() {
		var object = {};
		var temp = document.getElementById(this._searchTextId).value;
		if (!b.isEmpty(temp)) object.text = temp;
		return object;
	},
	getTable : function() {
		return this._table;
	},
	/** Override
	 * 
	 * <p>Creates an instance of the table that is used in conjuction
	 * with this search component. The table is an instance of
	 * b.table. The data from the search results will be inserted
	 * into this table.</p>
	 * 
	 * @param	targetId {String} The id of the element where the
	 * 			search results table is rendered. Required.
	 * @return	{b.table} An instance of the results table.
	 */
	createTable : function(targetId) {
		throw new Error("The createTable function is not implemented");
	},
	/** Override
	 * 
	 * <p>Executes the query using this component's criteria form and
	 * fetches the matching data to insert into this component's
	 * table.</p>
	 * <p>The search button will call this method and automatically
	 * pass in the criteria from the criteria form. In addition, the
	 * search action will provide onSuccess and onFailure processing.
	 * Therefore, most overrides should not manipulate the parameters
	 * but, instead, pass them into a model's search function.</p>
	 * 
	 * @param	criteria {Object} An object of data that the search
	 * 			uses to filter the data set. The data comes from this
	 * 			component's criteria form. Optional.
	 * @param	onSuccess {Function} The function that is executed
	 * 			upon a successful query. Optional.
	 * @param	onFailure {Function} The function that is executed
	 * 			when the query fails. Optional.
	 * @see		getCriteriaForm#getCriteria
	 */
	search : function(criteria, onSuccess, onFailure) {
		throw new Error("The search function is not implemented");
	}
};

/**
 * @param	options.targetId
 */
b.search = function(options) {
	if (!options.targetId) {
		throw new Error("The targetId option is required.");
	}
	
	this._oid = new Date().getTime();
	this._componentId = "search" + this._oid;

	this._criteriaSectionId = "searchCriteriaArea" + this._oid;
	this._formSectionId = "searchFormArea" + this._oid;
	this._resetButtonId = "resetButton" + this._oid;
	this._resultsSectionId = "searchResultsArea" + this._oid;
	this._searchButtonId = "searchButton" + this._oid;
	
	// Hmmm, lots of divs.
	var html = '<div id="' + this._componentId + '">' +
		'<div id="' + this._formSectionId + '">' +
		'<div id="' + this._criteriaSectionId + '"></div><div>' +
		'<button id="' + this._searchButtonId + '" class="b-button">Search</button>' +
		'<button id="' + this._resetButtonId + '" class="b-button">Clear</button>' +
		'</div></div>' +
		'<div id="' + this._resultsSectionId + '"></div></div>';
	
	$('#' + options.targetId).append(html);
	
	return this;
};
b.search.prototype = {
	initialize : function() {
		this._criteriaForm = this.createCriteriaForm(this._criteriaSectionId);
		this._table = this.createTable(this._resultsSectionId);
		$('#' + this._resetButtonId).bind('click', $.proxy(
				function() {
					this.getCriteriaForm().clear();
				},
				this));
		$('#' + this._searchButtonId).bind('click', $.proxy(
					function() {
						this.search(
								this.getCriteriaForm().getCriteria(),
								$.proxy(
									function(data) {
										this.clear();
										this.fill(data);
									},
									this.getTable()
								),
								function() { alert("error"); }
							);
					},
					this));
	},
	getTable : function() {
		return this._table;
	},
	getCriteriaForm : function() {
		return this._criteriaForm;
	},
	/** Override
	 * 
	 * <p>Creates an instance of the search criteria form that is
	 * used in conjunction with this search component. The form is
	 * an instance of b.criteriaForm.</p>
	 * 
	 * @param	targetId {String} The id of the element where the
	 * 			criteria form is rendered. Required.
	 * @return	{b.criteriaForm} An instance of the criteria form.
	 * 	
	 */
	createCriteriaForm : function(targetId) {
		throw new Error("The createCriteriaForm function is not implemented");
	},
	/** Override
	 * 
	 * <p>Creates an instance of the table that is used in conjuction
	 * with this search component. The table is an instance of
	 * b.table. The data from the search results will be inserted
	 * into this table.</p>
	 * 
	 * @param	targetId {String} The id of the element where the
	 * 			search results table is rendered. Required.
	 * @return	{b.table} An instance of the results table.
	 */
	createTable : function(targetId) {
		throw new Error("The createTable function is not implemented");
	},
	/** Override
	 * 
	 * <p>Executes the query using this component's criteria form and
	 * fetches the matching data to insert into this component's
	 * table.</p>
	 * <p>The search button will call this method and automatically
	 * pass in the criteria from the criteria form. In addition, the
	 * search action will provide onSuccess and onFailure processing.
	 * Therefore, most overrides should not manipulate the parameters
	 * but, instead, pass them into a model's search function.</p>
	 * 
	 * @param	criteria {Object} An object of data that the search
	 * 			uses to filter the data set. The data comes from this
	 * 			component's criteria form. Optional.
	 * @param	onSuccess {Function} The function that is executed
	 * 			upon a successful query. Optional.
	 * @param	onFailure {Function} The function that is executed
	 * 			when the query fails. Optional.
	 * @see		getCriteriaForm#getCriteria
	 */
	search : function(criteria, onSuccess, onFailure) {
		throw new Error("The search function is not implemented");
	}
};


b.observable = function() {
	this._observers = [];
	return this;
};
b.observable.prototype = {
	/**
	 * <p>Adds an observer to this object's property identified by
	 * the key parameter. When the key's value changes then the
	 * given method is executed within the given context. If provided,
	 * the method is passed the set of key and value pairs in the
	 * data parameter.</p>
	 * <p>Note, a key may have multiple observers.</p>
	 *
	 * @param	key {String} The name of the key (or property) that
	 * 			is being observed. Required.
	 * @param	context {Object} The object or context under which
	 * 			the method is run. All "this" references in method
	 * 			will refer to the context instance. Required.
	 * @param	method {String | Function} The function name or the
	 * 			function to execute upon a change in the key's value.
	 * 			The function is run in the given context. Required.
	 * @param	data {Object} Key and value pairs of data that are
	 * 			passed into the method. Optional.
	 */
	addObserver : function(key, context, method, data) {
		this._observers.push({
			key : key,
			context : context,
			method : method,
			data : data
		});
		return this;
	},
	removeObserver : function(key) {
		for (var i = 0; i < this._observers.length; i++) {
			if (this._observers[i].key == key) {
				this._observers.splice(i, 1);
			}
		}
	},
	callObserver : function(key) {
		function execute(obs) {
			if (typeof obs.method == "function") {
				obs.methodName.call(obs.context, obs.data);
			} else {
				obs.context[obs.method](obs.data);
			}
		}
		
		for (var i = 0; i < this._observers.length; i++) {
			if (this._observers[i].key == key) {
				execute(this._observers[i]);
			}
		}
	},
};
