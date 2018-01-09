const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

const mongoose = require('mongoose');
//Load Idea Model
require('../models/Tempat');
const Tempat = mongoose.model('tempat');

require('../models/Kategori');
const Kategori = mongoose.model('kategori');


router.get('/add',ensureAuthenticated,(req,res)=>{
	Kategori.find({}).then(kategori => {
		res.render('tempat/add', {
			title: 'Tambah Tempat',
			breadcrumb_active: 'Tambah Tempat',
			page_heading: 'Tambah Tempat Baru',
			icon_heading: '<i class="icon ion-navigate"></i>',
			kategori: kategori
		});
	})
	.catch(err => {
		if(err) throw err;
	})
});

router.post('/',ensureAuthenticated,(req,res)=>{
	let errors = [];

	if(!req.body.nama_tempat){
		errors.push({text: 'Nama Tempat Wajib Diisi'});
	}
	if(!req.body.kategori){
		errors.push({text: 'Kategori Wajib Diisi'});
	}
	if(!req.body.lokasi){
		errors.push({text: 'Lokasi Wajib Diisi'});
	}
	if(!req.body.deskripsi){
		errors.push({text: 'Deskripsi Wajib Diisi'});
	}
	if(!req.body.telepon){
		errors.push({text: 'Telepon Wajib Diisi'});
	}
	if(!req.body.longitude){
		errors.push({text: 'Koordinat Longitude Wajib Diisi'});
	}
	if(!req.body.latitude){
		errors.push({text: 'Koordinat Latitude Wajib Diisi'});
	}
	if(!req.body.image){
		errors.push({text: 'Link Gambar Wajib Diisi'});
	}

	if(errors.length > 0){
		Kategori.find({}).then(kategori => {
		res.render('tempat/add', {
			title: 'Tambah Tempat',
			breadcrumb_active: 'Tambah Tempat',
			page_heading: 'Tambah Tempat Baru',
			icon_heading: '<i class="icon ion-navigate"></i>',
			errors: errors ,
			nama_tempat: req.body.nama_tempat,
			kategori: kategori,
			lokasi: req.body.lokasi,
			deskripsi: req.body.deskripsi,
			telepon: req.body.telepon,
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			image: req.body.image
		});
	})
	.catch(err => {
		if(err) throw err;
	})
		
	}else{
		const newTempat = {
			nama_tempat: req.body.nama_tempat,
			kategori: req.body.kategori,
			lokasi: req.body.lokasi,
			deskripsi: req.body.deskripsi,
			telepon: req.body.telepon,
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			image: req.body.image
		}
		new Tempat(newTempat)
			.save()
			.then(tempat => {
				req.flash('success_msg', 'Data Tempat Berhasil Disimpan');
				res.redirect('/tempat');
			})
			.catch(err => {
				if(err){
					console.log(err);
				}
			});
	}
});

router.put('/:id/',ensureAuthenticated,(req, res) => {
	Tempat.findOneAndUpdate({
		_id: req.params.id
	}, {
			nama_tempat: req.body.nama_tempat,
			kategori: req.body.kategori,
			lokasi: req.body.lokasi,
			deskripsi: req.body.deskripsi,
			telepon: req.body.telepon,
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			image: req.body.image
		})
		.then(tempat => {
			req.flash('success_msg', 'Tempat Berhasil Diperbarui');
			res.redirect('/tempat');
		})
		.catch(err => {
			console.log(err);
		});
});

// Homepage
router.get('/',ensureAuthenticated, (req,res,)=>{
	Tempat.find({})
		.then(tempat => {
			res.render('tempat/index',{
				title: 'Data Tempat',
				breadcrumb_active: 'Data Tempat',
				page_heading: 'Daftar Data Tempat',
				icon_heading: '<i class="icon ion-location"></i>',
				link_tambah: `
					<a href="/tempat/add" class="btn btn-success">Tambah Tempat Baru</a>
				`,
				tempat: tempat
			});
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.get('/edit/:id',ensureAuthenticated, (req,res)=>{
	Tempat.findOne({
		_id: req.params.id
	})
		.then(tempat => {
			console.log(tempat);
			Kategori.find({})
				.then(kategori=>{
					res.render('tempat/edit',{
						title: 'Edit Data Tempat',
						breadcrumb_active: 'Edit Tempat',
						page_heading: 'Edit Tempat',
						icon_heading: '<i class="icon ion-edit"></i>',
						tempat: tempat,
						kategori: kategori
					});
				})
				.catch(err => {
					if(err) throw err;
				});
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

//Delete Idea
router.delete('/:id', ensureAuthenticated,(req, res) => {
	Tempat.remove({ _id: req.params.id })
		.then(()=>{
			req.flash('success_msg', 'Tempat Berhasil Dihapus');
			res.redirect('/tempat')
		})
		.catch(err => {
			console.log(err);
		});
});


module.exports = router;