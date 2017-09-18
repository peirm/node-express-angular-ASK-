/**
 * Created by su on 2017/9/18.
 */
//用户消息
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({

})
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;