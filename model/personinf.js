const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var info = new Schema({ 
    username:{
        type:String,
        required:true
    },
	firstname:{
	   type: String,
	   required: true
	},
    lastname:{
        type: String,
        required: true
     },
	gender:{
		type: String,
		required: true
	}, 
	dob:{
		type: Date,
		required: true
	},
	phone:{
		type: string,
		required: true
	}
})
Space.plugin(passportLocalMongoose);

module.exports = mongoose.model('info', info)
