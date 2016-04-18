
module.exports = {
  // the main entry of our app
  entry: ['./src/index.js' , './src/auth/index.js'],
  // output configuration
  output: {
    path: __dirname + '/build/',
    publicPath: '/build/',
    filename: 'build.js'
      },
 
  // how modules should be transformed
  module: {
    loaders: [
      // process *.vue files using vue-loader
      { test: /\.vue$/, loader: 'vue' },
      // process *.js files using babel-loader
      // the exclude pattern is important so that we don't
      // apply babel transform to all the dependencies!
      { test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }
    ]
  },
  // configure babel-loader.
  // this also applies to the JavaScript inside *.vue files
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devServer: {
    //host: 'localhost',
    port: 8000,
    //contentBase: __dirname ,
    /*proxy: {
      '*' : 'http://localhost:8080'  //radi ali duplicira podatke s VUE.JS
    }*/
    }
  
}
