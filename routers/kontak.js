const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

const mongoose = require('mongoose');
//Load Idea Model
require('../models/Kontak');
const Kontak = mongoose.model('kontak');


router.get('/add',ensureAuthenticated,(req,res)=>{
	res.render('kontak/add', {
		title: 'Tambah Kontak',
		breadcrumb_active: 'Tambah Kontak',
		icon_heading: '<i class="icon ion-document"></i>',
		page_heading: 'Tambah Kontak Baru'
	});
});

router.post('/',ensureAuthenticated, (req,res)=>{
	let errors = [];

	if(!req.body.keterangan){
		errors.push({text: 'Keterangan Wajib Diisi'});
	}
	if(!req.body.no_telepon){
		errors.push({text: 'No Telepon Wajib Diisi'});
	}

	if(errors.length > 0){
		res.render('kontak/add', {
			title: 'Tambah Kontak',
			breadcrumb_active: 'Tambah Lontak',
			page_heading: 'Tambah Kontak Baru',
			icon_heading: '<i class="icon ion-document"></i>',
			errors: errors ,
			keterangan: req.body.keterangan,
			no_telepon: req.body.no_telepon
		});
	}else{
		const newKontak = {
			keterangan: req.body.keterangan,
			no_telepon: req.body.no_telepon
		}
		new Kontak(newKontak)
			.save()
			.then(kontak => {
				req.flash('success_msg', 'Data Kontak Berhasil Disimpan');
				res.redirect('/kontak');
			})
			.catch(err => {
				if(err){
					console.log(err);
				}
			});
	}
});

router.get('/',ensureAuthenticated,(req,res)=>{
	Kontak.find({})
		.then(kontak => {
			res.render('kontak/index',{
				title: 'Data kontak',
				breadcrumb_active: 'Data kontak',
				page_heading: 'Daftar Data kontak',
				icon_heading: '<i class="icon ion-clipboard"></i>',
				link_tambah: `
					<a href="/kontak/add" class="btn btn-success">Tambah kontak Baru</a>
				`,
				kontak: kontak

			});
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.get('/edit/:id', ensureAuthenticated,(req,res)=>{
	Kontak.findOne({
		_id: req.params.id
	})
		.then(kontak => {
			res.render('kontak/edit',{
				title: 'Edit Data kontak',
				breadcrumb_active: 'Edit kontak',
				page_heading: 'Edit kontak',
				icon_heading: '<i class="icon ion-edit"></i>',
				kontak: kontak
			});
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.put('/:id/',ensureAuthenticated,(req, res) => {
	Kontak.findOneAndUpdate({
		_id: req.params.id
	}, {
			nama_kontak: req.body.nama_kontak
		})
		.then(Kontak => {
			req.flash('success_msg', 'Kontak Berhasil Diperbarui');
			res.redirect('/kontak');
		})
		.catch(err => {
			console.log(err);
		});
});

//Delete Idea
router.delete('/:id', ensureAuthenticated,(req, res) => {
	Kontak.remove({ _id: req.params.id })
		.then(()=>{
			req.flash('success_msg', 'Kontak Berhasil Dihapus');
			res.redirect('/kontak')
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;