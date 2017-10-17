/**
 * Created by su on 2017/10/12.
 */
const validator = require('validator');
const Reply = require('../model/Reply');
const Question = require('../model/Question');
const User = require('../model/User');
const at = require('../common/at');
const message = require('../common/message');
exports.add = (req, res, next) => {
    //存到Reply表里面去
    //文章的ID
    let question_id = req.params.question_id;
    //回复的内容
    let content = req.body.content;
    content = validator.trim(String(content));
    if(content === '') {
        return res.end('内容不能为空');
    }
    else {
        //存到Reply表里面去
        let newReply = new Reply();
        newReply.content = content;
        newReply.question_id = question_id;
        newReply.author = req.session.user._id;
        //第一个任务是存入Reply表
        newReply.save().then(reply => {
            let result = Reply.findOne({'_id': reply._id}).populate('question_id').populate('author');
            return result;
        }).then(reply => {
            //2.更新question表里面的信息
            reply.question_id.last_reply = reply._id;
            reply.question_id.last_reply_time = new Date();
            reply.question_id.last_reply_author = reply.author;
            reply.question_id.comment_num += 1;
            reply.question_id.save();
            return reply;
        }).then(reply => {
            //3.给当前@的人发送消息, 里面不包含作者
            User.findOne({'_id': reply.question_id.author}).then(author => {
                let author_name = author.name;
                let regex = new RegExp('@' + author_name + '\\b(?!\\])', 'g');
                let newContent = content.replace(regex,'');
                at.sendMessageToMentionUsers(newContent, reply.question_id, reply.author, reply._id, (err, msg) => {
                    if(err) {
                        res.end(err);
                    }
                })
            });
            return reply;
        }).then(reply => {
            //4. 用户积分+5, 回复数量+1
            reply.author.score += 5;
            reply.author.reply_count += 1;
            reply.author.save();
            req.session.user = reply.author;
            return reply;
        }).then(reply => {
            //5.给当前作者发一条有人给他回复的消息
            //如果当前作者给自己的文章回复, 是不能发消息的
            let question_author = reply.question_id.author;
            if(question_author != req.session.user._id) {
                //发消息
                message.sendReplyMessage(question_author, req.session.user._id, reply.question_id, reply._id, null);
            }
            return res.json({message: 'success'});
        }).catch(err => {
            console.log(err);
        })
    }
}