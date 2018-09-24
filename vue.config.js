module.exports={
    baseUrl: './',
    devServer:{
        open:false,
        port:'8082',
        proxy:{
            '/api':{
                target:'http://192.168.2.167',
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}