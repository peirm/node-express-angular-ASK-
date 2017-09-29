/**
 * Created by su on 2017/9/18.
 */
//问题表
const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    //分类
    category: {
        type: String,
        require: true
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    //更新时间
    update_time: {
        type: Date,
        default: Date.now
    },
    //标签
    tags: [String],
    //点击量
    click_num: {
        type: Number,
        default: 0
    },
    //评论量
    comment_num: {
        type: Number,
        default: 0
    },
    //关注量
    follow_num: {
        type: Number,
        default: 0
    },
    //作者
    author: {
        type: String,
        ref: 'User'
    },
    //最后回复的帖子
    last_reply: {
        type: String,
        ref: 'Reply'
    },
    //最后回复的时间
    last_reply_time: {
        type: Date,
        default: Date.now
    },
    //最后回复的人
    last_reply_author: {
        type: String,
        ref: 'User'
    },
    //是否被删除
    deleted: {
        type: Boolean,
        default: false
    }
})
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;