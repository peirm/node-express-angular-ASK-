/**
 * Created by su on 2017/9/18.
 */
//用户的配置参数放到这个对象上, 暴露出来
module.exports = {
    //数据库连接的地址
    host: 'localhost',
    //数据库连接的端口号
    port: 27017,
    //数据库的名字
    db: 'ask',
    //加密的密码
    psd: 'askSystem',
    mail_opts:{
        //邮箱的服务器地址
        host:'smtp.qq.com',
        //权限授权码
        auth:{
            user:'2638519660@qq.com',
            pass:'fxwapomfvrxkeaef'
        }
    },
    //cookie的名字
    auth_name: 'ask_system',
    //cookie的加密key值
    cookie_secret: 'suweiqing'
}