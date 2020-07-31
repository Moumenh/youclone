const express = require('express');
const router = express.Router();

const { Subscribe } = require('../models/Subscribe')
const { auth } = require("../middleware/auth");

router.post("/subscribeNumber", (req, res) => {

    Subscribe.find({ 'userTo' : req.body.userTo })
        .exec( (err, subscribe) => {
            if(err) return res.status(400).send(err)

            res.status(200).json({ success: true, subscribeNumber : subscribe.length })
        })
  
  });

  router.post("/subscribed", (req, res) => {

    Subscribe.find({ 'userTo' : req.body.userTo, 'userFrom': req.body.userFrom })
        .exec( (err, subscribe) => {
            if(err) return res.status(400).send(err)
            let result = false

            if( subscribe.length !== 0 ) {
                result = true
            }

            res.status(200).json({ success: true, subscribed: result, subscribe  })
        })
  
  });

  router.post("/subscribe", (req, res) => {

    if(req.body.userTo === req.body.userFrom) {
        return res.status(400).json( {success: false} )
    }

    const subscribe = new Subscribe(req.body)

    subscribe.save(( err, doc ) => {
        if(err) return res.status(400).json( {success: false, err} )
        return res.status(200).json({ success: true })
    })
        
  
  });

  router.post("/unsubscribe", (req, res) => {

    Subscribe.findOneAndDelete({ 'userTo' : req.body.userTo, 'userFrom': req.body.userFrom })
        .exec ( (err, doc) => {
            if(err) return res.status(400).json( { success: false, err } )
            res.status(200).json( { success:true } )
        } )
        
  });

  

  module.exports = router;