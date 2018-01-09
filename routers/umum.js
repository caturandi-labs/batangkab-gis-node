const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

const mongoose = require('mongoose');
//Load Idea Model
require('../models/Umum');
const Umum = mongoose.model('umum');


router.get('/add',ensureAuthenticated,(req,res)=>{
	res.render('umum/add', {
		title: 'Tambah Informasi Umum',
		breadcrumb_active: 'Tambah Informasi Umum',
		icon_heading: '<i class="icon ion-document"></i>',
		page_heading: 'Tambah Informasi Baru'
	});
});

router.post('/',ensureAuthenticated,(req,res)=>{
	let errors = [];

	if(!req.body.url_pemkab){
		errors.push({text: 'URL Pemkab Wajib Diisi'});
	}
	if(!req.body.url_persibat){
		errors.push({text: 'URL Persibat Wajib Diisi'});
	}

	if(!req.body.url_infobatang){
		errors.push({text: 'URL Info Batang Wajib Diisi'});
	}

	if(errors.length > 0){
		res.render('umum/add', {
			title: 'Tambah Informasi Umum',
			breadcrumb_active: 'Tambah Informasi Umum',
			page_heading: 'Tambah Informasi Baru',
			icon_heading: '<i class="icon ion-document"></i>',
			errors: errors ,
			url_infobatang: req.body.url_infobatang,
			url_persibat: req.body.url_persibat,
			url_pemkab: req.body.url_pemkab
		});
	}else{
		const newInformasiUmum = {
			url_pemkab: req.body.url_pemkab,
			url_persibat: req.body.url_persibat,
			url_infobatang: req.body.url_infobatang	
		}
		new Umum(newInformasiUmum)
			.save()
			.then(umum => {
				req.flash('success_msg', 'Data Informasi Berhasil Disimpan');
				res.redirect('/umum');
			})
			.catch(err => {
				if(err){
					console.log(err);
				}
			});
	}
});

router.get('/',ensureAuthenticated,(req,res)=>{
	Umum.find({})
		.then(umum => {
			res.render('umum/index',{
				title: 'Data Informasi Umum',
				breadcrumb_active: 'Data Informasi Umum',
				page_heading: 'Daftar Data Informasi Umum',
				icon_heading: '<i class="icon ion-clipboard"></i>',
				link_tambah: `
					<a href="/umum/add" class="btn btn-success">Tambah Informasi Baru</a>
				`,
				umum: umum

			});
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.get('/edit/:id',ensureAuthenticated, (req,res)=>{
	Umum.findOne({
		_id: req.params.id
	})
		.then(umum => {
			res.render('umum/edit',{
				title: 'Edit Data Informasi Umum',
				breadcrumb_active: 'Edit Informasi Umum',
				page_heading: 'Edit Informasi Umum',
				icon_heading: '<i class="icon ion-edit"></i>',
				umum: umum
			});
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.put('/:id/',ensureAuthenticated,(req, res) => {
	Umum.findOneAndUpdate({
		_id: req.params.id
	}, {
			url_pemkab: req.body.url_pemkab,
			url_persibat: req.body.url_persibat,
			url_infobatang: req.body.url_infobatang
		})
		.then(umum => {
			req.flash('success_msg', 'Informasi Umum Berhasil Diperbarui');
			res.redirect('/umum');
		})
		.catch(err => {
			console.log(err);
		});
});

//Delete Idea
router.delete('/:id',ensureAuthenticated,(req, res) => {
	Umum.remove({ _id: req.params.id })
		.then(()=>{
			req.flash('success_msg', 'Informasi Umum Berhasil Dihapus');
			res.redirect('/umum')
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;