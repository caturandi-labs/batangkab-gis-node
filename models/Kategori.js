const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Skema Database Kategori
const KategoriSchema= new Schema({
	nama_kategori: {
		type: String,
		required: true
	}
});

mongoose.model('kategori', KategoriSchema);