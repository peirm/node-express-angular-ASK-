/**
 * Created by su on 2017/9/18.
 */
//问题表
const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
//将基础的方法引入进来
const BaseModel = require('./base_model');
const _ = require('lodash');
const setting = require('../setting');
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
//创建一个虚拟的字段
QuestionSchema.virtual('categoryName').get(function () {
    let category = this.category;
    let pair = _.find(setting.categorys, function (item) {
        return item[0] == category;
    })
    if(pair) {
        return pair[1];
    }
    else {
        return '';
    }
})
QuestionSchema.statics = {
    //获取一个问题的相关信息
    getFullQuestion: (id, callback) => {
        //暂时可以先不去查询last_reply这个信息
        Question.findOne({'_id': id, 'deleted': false}).populate('author')
            .populate('last_reply_author').exec(callback);
    },
    //获取作者的其它文章列表
    getOtherQuestions: (author, question_id, callback) => {
        Question.find({'author': author, '_id': {$nin:[question_id]}}).limit(5)
            .sort({'last_reply_time': -1, 'create_time': -1}).exec(callback);
    }
}

//当前的模型就会有BaseModel里面的方法了
QuestionSchema.plugin(BaseModel);
const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;