var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

var keywordSchema = new mongoose.Schema({
    keyword_text: 'string',
});

keywordSchema.pre('save', function (next) {
    if (this.keyword_text.length < 3) {
        return next(new Error('keywords must be more than 3 characters'));
    }
    next();
});

//
// var ClaimerSchema = new mongoose.Schema({
//     claimer_name: {
//         type: String,
//         required: true,
//         minlength: 3,
//         unique: true
//     },
//     claimer_email: {
//         type: String,
//         required: true,
//         minlength: 3,
//         unique: true
//     },
// })

//Instruction says use only ONE schema
var OfferSchema = new mongoose.Schema({
    donor_name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    donor_email: {
        type: String,
        required: true,
        minlength: 3,
        pattern:"^\\S+@\\S+$"
    },
    // claimer: {
    //     type: String,
    //     required: true,
    //     minlength: 3,
    //     pattern:"^\\S+@\\S+$"
    // },
    item_name: {
        type: String,
        required: true,
        minlength: 3
    },
    item_details: {
        type: String,
        required: false,
        minlength: 3
    },
    item_quantity: {
        type: Number,
        required: true,
        min: 0
    },
    item_keywords: [keywordSchema]
},{timestamps: true});
OfferSchema.pre('save', function (next) {
    if (this.item_keywords.length > 5){
        return next(new Error('you can only have 5 keywords per item'));
    }
    next();
});

mongoose.model('OfferModel', OfferSchema);
var OfferModel = mongoose.model('OfferModel');
