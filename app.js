const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017/";
mongoose.connect(url + "wikiDB", {useNewUrlParser: true});

const articlesShema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articlesShema);

app.route("/articles")

.get(function(req, res){

    Article.find(function(err, findAllArticles){

        if(!err){
            res.send(findAllArticles);
        }else{
            res.send(err);
        }

    });

})

.post(function(req, res){

    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added new article!.");
        }else{
            res.send(err);
        }
    });

})

.delete(function(req, res){

    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles!.");
        }else{
            res.send(err);
        }
    });

});


app.route("/articles/:articleTitle")

.get(function(req, res){

    Article.findOne(
        {titile: req.params.articleTitle},
        function(err, foundArticle){
            if(foundArticle){
                res.send("Article found!." + foundArticle);
            }else{
                res.semd("No matching article found!.");
            }
    });

})

.put(function(req,res){

    Article.updateOne(

        {title: req.params.articleTitle},

        {
            title: req.body.title,
            content: req.body.content
        },

        //{overwrite: true},

        function(err){
            if(!err){
                res.send("Successfully updated article!.");
            }else{
                res.send(err);
            }
        }

    );

})

.patch(function(req, res){

    Article.updateOne(

        {title: req.params.articleTitle},

        {
            $set: req.body
        },

        function(err){
            if(!err){
                res.send("Successfully updated article!.");
            }else{
                res.send(err);
            }
        }
        
    );

})

.delete(function(req, res){

    Article.deleteOne(

        {title: req.params.articleTitle},

        function(err){
            if(!err){
                res.send("Successfully deleted article!.");
            }else{
                res.send(err);
            }
        }

    );

});


app.listen(port, function(){
    console.log("Server started on port " + port + ".");
});
