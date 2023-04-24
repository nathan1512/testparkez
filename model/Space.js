const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Space = new Schema({ 
         addr:{
		 country:{
			type: String,
		    required:true
		},
		 state:{
			type: String,
			required:true
		},
		district:{
			type: String,
		    required:true
		},
		street:{
			type: String,
		    required:true
		},
		propertynumber:{
			type: String,
		    required:true
		},
		postalcode:{
			type: String,
		    required:true
		}
	}, 
	capacity:{
		type: Number,
		required: true
	},
	username:{
		type: String,
		required: true
	}
})
Space.plugin(passportLocalMongoose);

module.exports = mongoose.model('Space', Space)
