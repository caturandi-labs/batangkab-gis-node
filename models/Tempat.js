const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Skema Database Tempat/Lokasi
const TempatSchema= new Schema({
	nama_tempat: {
		type: String,
		required: true
	},
	kategori: {
		type: String,
		required: true
	},
	lokasi: {
		type: String,
		required: true	
	},
	deskripsi:{
		type: String,
		required: true
	},
	telepon:{
		type: String,
		required: true
	},
	longitude: {
		type: Number,
		required: true
	},
	latitude: {
		type: Number,
		required: true
	},
	image: {
		type: String
	}
});

mongoose.model('tempat', TempatSchema);