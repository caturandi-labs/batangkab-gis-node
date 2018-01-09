const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');

const cors = require('cors');
const app = express();

//include passport in config 
require('./config/passport')(passport);

//DB Config
const db = require('./config/database');

// MongoDB Setting
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, {
	useMongoClient: true
})
	.then(()=>{
		console.log('MongoDB Berhasil Terkoneksi');
	})
	.catch((err)=>{
		console.log(err);
	});

// Load Models
require('./models/Tempat');
require('./models/Kategori');
const Tempat = mongoose.model('tempat');
const Kategori = mongoose.model('kategori');


app.use(cors());
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

//Load Router
const tempat = require('./routers/tempat');
const kategori = require('./routers/kategori');
const users = require('./routers/users');
const umum = require('./routers/umum');
const kontak = require('./routers/kontak');

const apiKategori = require('./routers/api/kategori');
const apiTempat = require('./routers/api/tempat');
const apiUmum = require('./routers/api/umum');
const apiKontak = require('./routers/api/kontak');

//Body Parser
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Express session middleware
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

const {ensureAuthenticated} = require('./helpers/auth');

//Global Variables
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

// override with POST having ?_method=PUT
//method override middleware
app.use(methodOverride('_method'));
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Endpoint
app.get('/',ensureAuthenticated,(req,res)=>{
	res.render('index', {
		title: 'Homepage',
		breadcrumb_active: 'Dashboard',
		page_heading: 'Dashboard'
	});
});

//Use Route Endpoint
app.use('/kategori', kategori);
app.use('/tempat', tempat);
app.use('/users', users);
app.use('/umum', umum);
app.use('/kontak', kontak);

//api
app.use('/api/kategori', apiKategori);
app.use('/api/tempat', apiTempat);
app.use('/api/umum', apiUmum);
app.use('/api/kontak', apiKontak);

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
	console.log(`Server Berjalan Pada Port ${PORT}`);
});