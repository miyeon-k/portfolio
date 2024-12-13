const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8090',
      changeOrigin: true,
    })
  )
  app.use(
    '/iamport',
    createProxyMiddleware({
      target: 'https://api.iamport.kr',      
      pathRewrite: {
        '^/iamport/': '/', // remove base path
      },
      changeOrigin: true,
    })
  )
  app.use(
    '/sgisapi',
    createProxyMiddleware({
      target: 'https://sgisapi.kostat.go.kr',      
      pathRewrite: {
        '^/sgisapi/': '/', // remove base path
      },
      changeOrigin: true,
    })
  )
  app.use(
    '/lbank',
    createProxyMiddleware({
      target: 'https://api.lbkex.com',      
      pathRewrite: {
        '^/lbank/': '/', // remove base path
      },
      changeOrigin: true,
    })
  )
  app.use(
    '/usd',
    createProxyMiddleware({
      target: 'https://quotation-api-cdn.dunamu.com',      
      pathRewrite: {
        '^/usd/': '/', // remove base path
      },
      changeOrigin: true,
    })
  )

  
};