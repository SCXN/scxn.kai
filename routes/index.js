var express = require('express');
var router = express.Router();
require("dotenv").config();
const { post } = require('jquery');
const { DateTime } = require("luxon");

//Necessary for contact form
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");

//Necessary for Tumblr
const tumblr = require('tumblr.js');

//Connnect to outlook via nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  },
});

//Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//Connect to tumblr
const tumblrClient = tumblr.createClient({
  credentials:{consumer_key: process.env.TCK,
  consumer_secret: process.env.TCS,
  token: process.env.TT,
  token_secret: process.env.TSS
}, returnPromises: true,});

//Retreive Breakfast Menu from tumblr
function blog(req,res,next){
  tumblrClient.blogPosts('illustratesideas', {type: 'text', tag: ['blog']}).then(resp=>{
    postUrl=resp.posts[0].post_url
    postPubDate=resp.posts[0].date;
    postTitle=resp.posts[0].title;
    blogPost=resp.posts[0].body;
    //tumblrOptions=resp.posts[0];
    dateToLuxon=postPubDate;
    pubDate=DateTime.fromSQL(dateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.postTitle=postTitle;
    res.locals.blogPost=blogPost;
    res.locals.pubDate=pubDate;
    res.locals.postUrl=postUrl;
    //console.log(tumblrOptions);
    next();
  }).catch(e => {
    console.log(e);
    });
}

function solution(req,res,next){
  tumblrClient.blogPosts('illustratesideas', {type: 'text', tag: ['the web solution']}).then(resp=>{
    solutionUrl=resp.posts[0].post_url
    solutionPubDate=resp.posts[0].date;
    solutionTitle=resp.posts[0].title;
    solutionPost=resp.posts[0].body;
    //tumblrOptions=resp.posts[0];
    dateToLuxon=solutionPubDate;
    solutionDate=DateTime.fromSQL(dateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.solutionTitle=solutionTitle;
    res.locals.solutionPost=solutionPost;
    res.locals.solutionDate=solutionDate;
    res.locals.solutionUrl=solutionUrl;
    //console.log(tumblrOptions);
    next();
  }).catch(e => {
    console.log(e);
    });
}

function about(req,res,next){
  tumblrClient.blogPosts('illustratesideas', {type: 'text', tag: ['About Kai']}).then(resp=>{
    aboutUrl=resp.posts[0].post_url
    aboutPubDate=resp.posts[0].date;
    aboutTitle=resp.posts[0].title;
    aboutPost=resp.posts[0].body;
    //tumblrOptions=resp.posts[0];
    dateToLuxon=aboutPubDate;
    aboutDate=DateTime.fromSQL(dateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.aboutTitle=aboutTitle;
    res.locals.aboutPost=aboutPost;
    res.locals.aboutDate=aboutDate;
    res.locals.aboutUrl=solutionUrl;
    //console.log(tumblrOptions);
    next();
  }).catch(e => {
    console.log(e);
    });
}

function threeKeys(req,res,next){
  tumblrClient.blogPosts('illustratesideas', {type: 'text', tag: ['Three Keys']}).then(resp=>{
    keysUrl=resp.posts[0].post_url
    keysPubDate=resp.posts[0].date;
    keysTitle=resp.posts[0].title;
    keysPost=resp.posts[0].body;
    //tumblrOptions=resp.posts[0];
    dateToLuxon=keysPubDate;
    keysDate=DateTime.fromSQL(dateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.keysTitle=keysTitle;
    res.locals.keysPost=keysPost;
    res.locals.keysDate=keysDate;
    res.locals.keysUrl=solutionUrl;
    //console.log(tumblrOptions);
    next();
  }).catch(e => {
    console.log(e);
    });
}

function services(req,res,next){
  tumblrClient.blogPosts('illustratesideas', {type: 'text', tag: ['services']}).then(resp=>{
    servicesUrl=resp.posts[0].post_url
    servicesPubDate=resp.posts[0].date;
    servicesTitle=resp.posts[0].title;
    servicesPost=resp.posts[0].body;
    //tumblrOptions=resp.posts[0];
    dateToLuxon=servicesPubDate;
    servicesDate=DateTime.fromSQL(dateToLuxon).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    res.locals.servicesTitle=servicesTitle;
    res.locals.servicesPost=servicesPost;
    res.locals.servicesDate=servicesDate;
    res.locals.servicesUrl=solutionUrl;
    //console.log(tumblrOptions);
    next();
  }).catch(e => {
    console.log(e);
    });
}

/* GET home page. */
router.get('/',blog, solution, about, threeKeys, services,
function(req, res, next) {
  console.log(`${blogPost}: Lookin good`)
  res.render('index', {
    title: `Kai Lavatai`,
    description:`Today's natural, elegant and modern approach to web publishing`,
    sub:`Web Design & Publishing`});
    next()
});

router.post('/send', (req, res, ) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      sender: `${data.name} <${data.address}>`,
      to: process.env.EMAIL, // receiver email,
      subject: data.subject,
      text: `From:\n${data.name} <email: ${data.address}> \n${data.message}`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        //res.status(500).send("Something went wrong.");
        res.render('yikes');
      } else {
        res.render('thanksForYourComment');
      }
    });
  });
});

module.exports = router;
