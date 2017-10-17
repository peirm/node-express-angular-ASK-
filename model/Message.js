/**
 * Created by su on 2017/9/18.
 */
//用户消息
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
//将基础的方法引入进来
const BaseModel = require('./base_model');
const MessageSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    type: {
        type: String,
        require: true
    },
    target_id: {
        type: String,
        require: true,
        ref: 'User' //关联User表
    },
    author_id: {
        type: String,
        require: true,
        ref: 'User' //关联User表
    },
    question_id: {
        type: String,
        require: true,
        ref: 'Question' //关联Question表
    },
    //用户在回复某个人的时候, 或者在回复中@某个人的时候, 这个reply_id会记录对应的回复的ID
    reply_id: {
        type: String,
        require: true,
        ref: 'Reply' //关联Reply表
    },
    has_read: {
        type: Boolean,
        default: false
    },
    create_time: {
        type: Date,
        default: Date.now
    }
})

MessageSchema.statics = {
    //获取未读消息的数量
    getMessagesNoReadCount: (id, callback) => {
        Message.count({'target_id': id, 'has_read': false}, callback);
    },
    //读取未读消息
    getUnReadMessages: (id, callback) => {
        Message.find({'target_id': id, 'has_read': false}, null, {sort: '-create_time'}).populate('author_id').populate('target_id')
            .populate('question_id').populate('reply_id').exec(callback);
    },
    //读取已读消息
    getReadMessages: (id, callback) => {
        Message.find({'target_id': id, 'has_read': true}, null, {sort: '-create_time', limit: 20}).populate('author_id')
            .populate('target_id').populate('question_id').populate('reply_id').exec(callback);
    },
    //更新某条消息为已读
    updateMessage: (id, callback) => {
        Message.update({'_id': id}, {$set: {'has_read': true}}).exec(callback);
    },
    //更新某个用户所有未读消息
    updateAllMessage: (user_id, callback) => {
        Message.update({'target_id': user_id}, {$set: {'has_read': true}}, {multi: true}).exec(callback);
    }
}

//当前的模型就会有BaseModel里面的方法了
MessageSchema.plugin(BaseModel);
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;