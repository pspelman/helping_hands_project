var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var OfferModel = mongoose.model('OfferModel');
var OfferModels = mongoose.model('OfferModel');

mongoose.Promise = global.Promise;

class errorObject {
    constructor(){
        this.has_errors = false;
        this.err_list = [];
    }
}


router.get('/', function (req, res) {
    console.log(`reached the router`,);
    res.sendFile(path.resolve("./public/dist/index.html"));
});



router.get('/offers', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    console.log(`arrived at GET offers...getting all offers`,);

    OfferModels.find({}).
    // sort({stars: 1}).exec(function (err, offers) {
    exec(function (err, offers) {
        if (err) {
            err_holder.push(err.message);
            errs.has_errors = true;
            errs.error_list.push(err.message);
            console.log(`there was an error looking up offers`, err);
            res.json({'message': 'there was an error', 'errors': err.message, 'err_holder': err_holder, 'errs': errs})
        } else {
            res.json({'message': 'successfully retrieved offers', 'offers': offers, 'errs': errs});
        }
    });

});


//DONE: router.get('/offers/:id', function(req, res){}
//get a SINGLE author by ID
router.get('/offers/:id', function (req, res) {
    let errs = new errorObject();
    console.log(`req.body: `,req.body);
    console.log(`id: `,req.params.id);

    let selected_offer = new OfferModel();

    OfferModel.find({_id: req.params.id}, function (err, offer) {
        if (err) {
            errs.has_errors = true;
            errs.err_list.push(err.message);
            res.json({"message": "There were errors looking up offer info", "errs": errs});
        } else {
            console.log(`Found offer: `,offer);
            res.json({"message": "found offer", "offer": offer, "errs": errs});
        }
    });
});


router.post('/offers', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    //new data recieved
    console.log(`request.body: `,req.body);

    console.log(`recieved request to make new movie`,);

    let new_offer = new OfferModel();


    if(req.body.donor_name.length < 3){
        errs.has_errors = true;
        errs.err_list.push("Name Was Not Long Enough, Must Be More Than 3 characters")
    }

    if(req.body.item_name.length < 3){
        errs.has_errors = true;
        errs.err_list.push("Item Name Was Not Long Enough, Must Be More Than 3 characters")
    }
    if(req.body.donor_email.length < 3){
        errs.has_errors = true;
        customErrors.push("Email Was Not Long Enough, Must Be More Than 3 characters")
    }

    if (req.body.item_details.length > 0 && req.body.item_details.length < 3 ){
        errs.has_errors = true;
        errs.err_list.push("Optional description must be more than 3 characters if included");
    }

    if (req.body.item_quantity < 1 ){
        errs.has_errors = true;
        errs.err_list.push("Quantity must be greater than zero");
    }

    if (errs.has_errors) {
        console.log(`errors!`,);
        res.json({"message": "error trying to save new offer", "errs": errs});
    } else {
        new_offer.donor_name = req.body.donor_name;
        new_offer.donor_email = req.body.donor_email;
        new_offer.item_name = req.body.item_name;
        new_offer.item_details = req.body.item_details;
        new_offer.item_quantity = req.body.item_quantity;

        new_offer.save(function (err) {
            if (err) {
                // console.log(`there was an error saving to db`, err);
                errs.has_errors = true;
                errs.error_list.push(err.message);
                console.log(`there were errors saving to db`, err.message );
                res.json({'message': 'unable to save new offer', 'errs': errs})
            } else {
                console.log(`successfully saved!`);
                res.json({'message': 'Saved new offer!', 'errs': errs})
            }
        });
    }
});


//TODO : function for liking helping_hands_model

// router.put('/offers/like/:id', function (req, res) {
//     console.log(`like req: `, req.params._id);
//
//
//     OfferModel.findOneAndUpdate(
//         { _id: req.params.id },
//         {$inc: {likes: 1}}).exec(function(err, helping_hands_model_data) {
//         if (err) {
//             throw err;
//         }
//         else {
//             console.log(helping_hands_model_data);
//             res.json({'message': 'did the likes', 'helping_hands_model':helping_hands_model_data})
//         }
//     })
// });


router.put('/helping_hands_models/:id', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    console.log(`ID: `,req.params.id);
    console.log(`reached helping_hands_model updater. Body: `, req.body);


    var opts = {runValidators: true , context: 'query'};
    OfferModel.findOneAndUpdate({_id: req.params.id}, {
        helping_hands_model_name: req.body.helping_hands_model_name,
        type: req.body.type,
        description: req.body.description,
        // "$set": {
        //     "skills.0": req.body.skills[0],
        // }
        // skills: [req.body.skills[0], req.body.skills[1], req.body.skills[2]],
    }, opts, function (err) {
        if (err) {
            console.log(`there was an error updating`, err.message);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            res.json({'message': 'problem updating helping_hands_model', 'errs': errs});

        } else {
            res.json({'message': 'successfully updated helping_hands_model', 'errs': errs});

        }
    });

});



//FIXME: ADD quote to selected author
router.put('/add_helping_hands_model/:helping_hands_model_id', function (req, res) {
    console.log(`got request to update author's quotes auth: `,req.params.helping_hands_model_id);
    let errors = [];
    let helping_hands_model_id = req.params.helping_hands_model_id;
    let text_to_add_as_quote = req.body.quote_text;

    //validate quote length
    if(text_to_add_as_quote.length < 3){
        console.log(`you done messed up`,);
        let err = new Error("quote is not long enough");
        errors.push(err.message);
        res.json({'message':'done with the thing', 'author':helping_hands_model_id, 'errors': errors});

    } else {
        OfferModel.find({_id: helping_hands_model_id}, function (err, author) {
            if (err) {
                errors.push(err.message);
                res.json({"message":"error adding quote", "errors":errors})
            } else {
                let author_to_update = author[0];
                console.log(`got the author, continue to ADD a quote:`,author);
                author[0].quotes.push({ quote_text: text_to_add_as_quote });
                author[0].save();
                res.json({'message':'Successfully saved', 'author':helping_hands_model_id});
            }
        });
    }
});

//TODO: router.delete('/', function(req, res){}
router.delete('/helping_hands_models/:id', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];

    console.log(`trying to delete...or adopt...the helping_hands_model`,);
    let helping_hands_model_id = req.params.id;

    console.log(`helping_hands_model: ${helping_hands_model_id}`);
    OfferModel.remove({_id: req.params.id}, function (err) {
        if (err) {
            errs.has_errors = true;
            errs.err_list.push(err);
            res.json({'message': 'Error when deleting helping_hands_model', 'errs': errs});

        } else {
            res.json({'message': 'successfully deleted helping_hands_model', 'errs': errs});

        }

    });

    // res.json({'message': 'trying to remove helping_hands_model', 'helping_hands_model_id': helping_hands_model_id});


});

router.all("/*", (req,res,next) => {
    console.log(`reached wildcard route...need to redirect to Angular templates`,);
    res.sendFile(path.resolve("./public/dist/index.html"));
});



function update_by_quote_sub_id(){
    OfferModel.findOne({'quote._id': quoteId}).then(author => {
        let quote = author.quote.id(quoteId);
        quote.votes = 'something';
        return author.save();
    });
}

// Note that sub document array return from mongoose are mongoose
// array instead of the native array data type. So you can manipulate them using .id .push .pop .remove method
// http://mongoosejs.com/docs/subdocs.html



//create one sample thing on load
var createSampleHelpingHandsModel = function () {
    let errs = new errorObject();
    let err_holder = [];
    console.log(`trying to make a sample OfferModel`,);
    var HelpingHandsModelInstance = new OfferModel();
    // HelpingHandsModelInstance.helping_hands_model_name = 'Barney';
    // HelpingHandsModelInstance.type = 'cat';
    // HelpingHandsModelInstance.description = 'fat cat in Washington';
    // HelpingHandsModelInstance.skills = ['bird watching', 'killing','littering', 'something_else'];
    HelpingHandsModelInstance.helping_hands_model_name = 'Blake';
    HelpingHandsModelInstance.type = 'Dog';
    HelpingHandsModelInstance.description = 'Likes lasagna';
    HelpingHandsModelInstance.skills.push({skill: 'pooping'});
    var subdoc = HelpingHandsModelInstance.skills[0];
    console.log(`SKILL SUBDOC: `,subdoc);

    HelpingHandsModelInstance.save(function (err) {
        if (err) {
            // console.log(`there was an error saving to db`, err);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            console.log(`there were errors saving to db`, err.message );
        } else {
            console.log(`successfully saved!`);
        }
    });
};
// createSampleHelpingHandsModel();


module.exports = router;
