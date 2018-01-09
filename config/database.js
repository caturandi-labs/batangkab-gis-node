if(process.env.NODE_ENV === 'production' ){
  module.exports = {mongoURI: 'mongodb://caturandip:sumiyati@ds119250.mlab.com:19250/batangguide-prod'};
} else {
  module.exports = {mongoURI: 'mongodb://localhost/batangguide-dev'};
}