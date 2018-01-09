const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

const mongoose = require('mongoose');
//Load Idea Model
require('../models/Kategori');
const Kategori = mongoose.model('kategori');


router.get('/add',ensureAuthenticated,(req,res)=>{
	res.render('kategori/add', {
		title: 'Tambah Kategori',
		breadcrumb_active: 'Tambah Kategori',
		icon_heading: '<i class="icon ion-document"></i>',
		page_heading: 'Tambah Kategori Baru'
	});
});

router.post('/', ensureAuthenticated,(req,res)=>{
	let errors = [];

	if(!req.body.nama_kategori){
		errors.push({text: 'Nama Kategori Wajib Diisi'});
	}

	if(errors.length > 0){
		res.render('kategori/add', {
			title: 'Tambah Kategori',
			breadcrumb_active: 'Tambah Kategori',
			page_heading: 'Tambah Kategori Baru',
			icon_heading: '<i class="icon ion-document"></i>',
			errors: errors ,
			nama_kategori: req.body.nama_kategori
		});
	}else{
		const newKategori = {
			nama_kategori: req.body.nama_kategori
		}
		new Kategori(newKategori)
			.save()
			.then(kategori => {
				req.flash('success_msg', 'Data Kategori Berhasil Disimpan');
				res.redirect('/kategori');
			})
			.catch(err => {
				if(err){
					console.log(err);
				}
			});
	}
});

router.get('/',ensureAuthenticated,(req,res)=>{
	Kategori.find({})
		.then(kategori => {
			res.render('kategori/index',{
				title: 'Data Kategori',
				breadcrumb_active: 'Data Kategori',
				page_heading: 'Daftar Data Kategori',
				icon_heading: '<i class="icon ion-clipboard"></i>',
				link_tambah: `
					<a href="/kategori/add" class="btn btn-success">Tambah Kategori Baru</a>
				`,
				kategori: kategori

			});
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.get('/edit/:id', (req,res)=>{
	Kategori.findOne({
		_id: req.params.id
	})
		.then(kategori => {
			res.render('kategori/edit',{
				title: 'Edit Data Kategori',
				breadcrumb_active: 'Edit Kategori',
				page_heading: 'Edit Kategori',
				icon_heading: '<i class="icon ion-edit"></i>',
				kategori: kategori
			});
		})
		.catch(err => {
			if (err) {
				console.log(err);
			}
		});
});

router.put('/:id/',(req, res) => {
	Kategori.findOneAndUpdate({
		_id: req.params.id
	}, {
			nama_kategori: req.body.nama_kategori
		})
		.then(kategori => {
			req.flash('success_msg', 'Kategori Berhasil Diperbarui');
			res.redirect('/kategori');
		})
		.catch(err => {
			console.log(err);
		});
});

//Delete Idea
router.delete('/:id', ensureAuthenticated,(req, res) => {
	Kategori.remove({ _id: req.params.id })
		.then(()=>{
			req.flash('success_msg', 'Kategori Berhasil Dihapus');
			res.redirect('/kategori')
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;