module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        // old API
        // target: 'https://gy4q3fpx3gh77gw.kk5yuzmev2qbgulz.com',

        // new API
        target: 'http://162.14.79.8:3027',

        changeOrigin: true, // Optional, for cross-origin requests
        ws: true, // Optional, for WebSocket support
        pathRewrite: {
          // '^/api': '' // Optional, to rewrite the path prefix
        }
      }
    }
  },
}