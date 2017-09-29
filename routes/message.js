/**
 * Created by su on 2017/9/18.
 */
//静态资源的对象
const mapping = require('../static');
//消息列表的处理函数
exports.index = (req, res, next) => {
    res.render('messages', {
        title: '消息',
        layout: 'indexTemplate',
        resource: mapping.messages
    })
}
//更新某个消息的处理函数
exports.updateMessage = (req, res, next) => {

}
//已读所有消息的处理函数
exports.updateAllMessage = (req, res, next) => {

}