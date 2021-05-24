module.exports = {
    excludeFile: (str) => /server.ts/.test(str),
    images: {
        domains: ['localhost']
    }
}
/*

const withCSS = require('@zeit/next-css');
*/

/*
module.exports = withCSS({
   cssLoaderOptions: {
       url: false
   }
});
*/
