const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Space = new Schema({ 
	name:{
	   type: String,
	   required: true
	},
	addr:{
		type: String,
		required: true
	}, 
	capacity:{
		type: Number,
		required: true
	},
	userassociated:{
		type: String,
		required: true
	}
})
Space.plugin(passportLocalMongoose);

module.exports = mongoose.model('Space', Space)
