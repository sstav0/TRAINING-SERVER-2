const Items = require('../Models/itemsModel');

const I = new Items();

exports.home = async function(req, res){
	const items = await I.loadMany();
	res.render('home.ejs', {shopping : items});
}

exports.delItem = async function(req, res){ 
	let id = req.body.del; 
	await I.delete(id, 'id_item');

	res.redirect('/');
}

exports.addItem = async function(req, res){
	let name = req.body.item;
	let quantity = req.body.quantity;

	await I.save({'name': name, 'quantity': quantity});
	res.redirect('/');
}

exports.checkItem = async function(req, res){
	let id = req.body.check;
	await I.update({'purchased': 1}, 'id_item', id);
	res.redirect('/');
}

