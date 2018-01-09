const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Load Idea Model
require('../../models/Umum');
const Umum = mongoose.model('umum');

router.get('/', (req,res)=>{
	Umum.find({})
		.then(umum => {
			if(umum.length > 0){
				res.json(umum);
			}else{
				res.json({
					message: "Data Informasi Tidak Tersedia"
				});
			}
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

module.exports = router;