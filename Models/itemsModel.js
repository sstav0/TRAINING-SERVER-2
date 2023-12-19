const Model = require('./Model.js');

class Items extends Model {
	constructor (){
		super("items");
	}
}

module.exports = Items;