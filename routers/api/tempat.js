const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
//Load Idea Model
require('../../models/Tempat');
const Tempat = mongoose.model('tempat');

router.get('/', (req,res,)=>{
	Tempat.find({})
		.then(tempat => {
			res.json(tempat);
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.get('/show/:id', (req,res)=>{
	Tempat.findOne({
		_id: req.params.id
	})
		.then(tempat => {
			res.json(tempat);
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.get('/kategori/:id', (req,res)=>{
	Tempat.find({
		kategori: req.params.id
	})
		.then(tempat => {
			res.json(tempat);
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

module.exports = router;