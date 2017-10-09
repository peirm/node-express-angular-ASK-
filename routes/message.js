/**
 * Created by su on 2017/9/18.
 */
//静态资源的对象
const mapping = require('../static');
const Message = require('../model/Message');
//消息列表的处理函数
exports.index = (req, res, next) => {
    //未读消息和已读消息两种消息分别查询出来, 放到这个页面中去
    //读取的是当前登录用户的已读消息和未读消息
    let mission1 = new Promise((resolve, reject) => {
        Message.getUnReadMessages(req.session.user._id, (err, datalist) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(datalist);
            }
        })
    })
    let mission2 = new Promise((resolve, reject) => {
        Message.getReadMessages(req.session.user._id, (err, undatalist) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(undatalist)
            }
        })
    })
    Promise.all([mission1, mission2]).then((result) => {
        let read = result[1];
        let no_read = result[0];
        res.render('messages', {
            title: '消息',
            layout: 'indexTemplate',
            resource: mapping.messages,
            no_read: no_read,
            read: read
        })
    }).catch(err => {
        console.log(err);
    })
}
//更新某个消息的处理函数
exports.updateMessage = (req, res, next) => {

}
//已读所有消息的处理函数
exports.updateAllMessage = (req, res, next) => {

}