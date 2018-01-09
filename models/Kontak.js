const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Skema Database Kategori
const KontakSchema= new Schema({
	keterangan: {
		type: String,
		required: true
	},
	no_telepon: {
		type: String
	}
});

mongoose.model('kontak', KontakSchema);