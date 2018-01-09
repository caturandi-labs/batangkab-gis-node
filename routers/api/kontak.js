const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Load Idea Model
require('../../models/Kontak');
const Kontak = mongoose.model('kontak');

router.get('/', (req,res)=>{
	Kontak.find({})
		.then(kontak => {
			res.json(kontak);
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

module.exports = router;