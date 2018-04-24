var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var HelpingHandsModel = mongoose.model('HelpingHandsModel');
var HelpingHandsModels = mongoose.model('HelpingHandsModel');

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


//DONE: router.get('/', function(req, res){}
//get all helping_hands_models
router.get('/helping_hands_models', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    console.log(`arrived at GET helping_hands_models...getting all helping_hands_models`,);
    HelpingHandsModels.find({}, function (err, helping_hands_models) {
        if(err){
            err_holder.push(err.message);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            console.log(`there was an error looking up helping_hands_models`, err);
            res.json({'message':'there was an error', 'errors': err.message, 'err_holder':err_holder, 'errs':errs})
        } else {
            res.json({'message': 'successfully retrieved helping_hands_models', 'helping_hands_models': helping_hands_models, 'errs':errs});
        }
    });
});


//DONE: router.get('/helping_hands_models/:id', function(req, res){}
//get a SINGLE author by ID
router.get('/helping_hands_models/:id', function (req, res) {
    let errs = new errorObject();
    console.log(`req.body: `,req.body);
    let helping_hands_model_id = req.params.id;
    console.log(`reached individual helping_hands_model lookup`,);
    // res.json({'message':'working on it!'});
    //get the helping_hands_model
    var helpingHandsPromise = new Promise(function (resolve, reject) {
        resolve(HelpingHandsModels.find({_id: req.params.id}));
    })
        .then(function (helping_hands_model) {
            res.json({'message': 'successfully retrieved the helping_hands_model', 'helping_hands_model': helping_hands_model});
        })
        .catch(function (err) {
            console.log(`caught err`, err);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            res.json({'message':'There was a problem with the request', 'err':err.message, 'errs':errs})
        });

});






//DONE: router.post('/helping_hands_models', function(req, res){}
//FIXME: backside validation errors - standardize the way they are sent back to the front
//create a helping_hands_model
router.post('/helping_hands_models', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    //new data recieved
    console.log(`request.body: `,req.body);

    console.log(`   recieved request to make new helping_hands_model`,);
    let helping_hands_model = new HelpingHandsModel();

    if (req.body.helping_hands_model_name.length < 3) {
        errs.has_errors = true;
        errs.err_list.push("name must be at least 3 characters");
    }
    if (req.body.type.length < 3){
        errs.has_errors = true;
        errs.err_list.push("type must be at least 3 characters");
    }
    if (req.body.description.length < 3){
        errs.has_errors = true;
        errs.err_list.push("description must be at least 3 characters");
    }

    helping_hands_model.helping_hands_model_name = req.body.helping_hands_model_name;;
    helping_hands_model.type = req.body.type;
    helping_hands_model.description = req.body.description;

    let new_skills = req.body.skills;
    console.log(`New skills`,new_skills);
    console.log(`New skills length: `,new_skills.length);
    // res.json({'message': 'Working on it'})

    console.log(`HelpingHandsModel new_skills recieved:`,new_skills);
    for(let i = 0; i < new_skills.length; i++){
        if(new_skills[i] === null){
            continue;
        }
        if (new_skills[i] && new_skills[i].length < 3) {
            errs.has_errors = true;
            errs.err_list.push('new_skills must be at least 3 characters');
            break;
        }
        helping_hands_model.skills.push({skill: new_skills[i]});
        var subdoc = helping_hands_model.skills[i];
        console.log(`SKILL SUBDOC: `,subdoc);

    }

    helping_hands_model.save(function (err) {
        if (err) {
            // console.log(`there was an error saving to db`, err);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            console.log(`there were errors saving to db`, err.message );
            res.json({'message': 'unable to save new helping_hands_model', 'errs': errs})

        } else {
            console.log(`successfully saved!`);
            res.json({'message': 'Saved new helping_hands_model!', 'errs': errs})
        }
    });

});


//TODO : function for liking helping_hands_model

router.put('/helping_hands_models/like/:id', function (req, res) {
    console.log(`like request: `, req.params._id);


    HelpingHandsModels.findOneAndUpdate(
        { _id: req.params.id },
        {$inc: {likes: 1}}).exec(function(err, helping_hands_model_data) {
        if (err) {
            throw err;
        }
        else {
            console.log(helping_hands_model_data);
            res.json({'message': 'did the likes', 'helping_hands_model':helping_hands_model_data})
        }
    })
});



//FIXME: standardize sending back errors
//update an author's name
router.put('/helping_hands_models/:id', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    console.log(`ID: `,req.params.id);
    console.log(`reached helping_hands_model updater. Body: `, req.body);


    var opts = {runValidators: true , context: 'query'};
    HelpingHandsModels.findOneAndUpdate({_id: req.params.id}, {
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
        HelpingHandsModels.find({_id: helping_hands_model_id}, function (err, author) {
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
    HelpingHandsModels.remove({_id: req.params.id}, function (err) {
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
    HelpingHandsModels.findOne({'quote._id': quoteId}).then(author => {
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
    console.log(`trying to make a sample HelpingHandsModel`,);
    var HelpingHandsModelInstance = new HelpingHandsModel();
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
