const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Load Idea Model
require('../../models/Kategori');
const Kategori = mongoose.model('kategori');

router.get('/', (req,res)=>{
	Kategori.find({})
		.then(kategori => {
			res.json(kategori);
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.get('/show/:id', (req,res)=>{
	Kategori.findOne({
		_id: req.params.id
	})
		.then(kategori => {
			res.json(kategori);
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});


module.exports = router;