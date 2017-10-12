/**
 * Created by su on 2017/9/18.
 */
//一级回复表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//将基础的方法引入进来
const BaseModel = require('./base_model');
const ReplySchema = new Schema({

})
//当前的模型就会有BaseModel里面的方法了
ReplySchema.plugin(BaseModel);
const Reply = mongoose.model('Reply', ReplySchema);
module.exports = Reply;