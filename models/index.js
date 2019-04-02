module.exports = function(mongoose){

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    
    const BlogPost = new Schema({
        _id: Number,
        title: String,
        content: String,
        date: Date
    });

}