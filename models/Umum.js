const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Skema Database InfoUmum
const UmumSchema= new Schema({
	url_pemkab: {
		type: String
	},
	url_persibat: {
		type: String
	},
	url_infobatang: {
		type: String
	}
});

mongoose.model('umum', UmumSchema);