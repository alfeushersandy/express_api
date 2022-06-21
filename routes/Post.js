const express= require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

//import database 
const connection = require('../config/Database');

//index post 
router.get('/', function(req,res){
    connection.query('SELECT * FROM post ORDER BY id desc', function(err, data){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'internal server error'
            })
        }else{
            return res.status(200).json({
                status: true,
                data: data,
                message: 'list data post'
            })
        }
    })
})
router.post('/store',[
    body('title').notEmpty(),
    body('content').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    connection.query('INSERT INTO post set ? ', formData, function(err, data){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'internal server error'
            })
            }else{
                return res.status(201).json({
                    status: true,
                    message: 'insert data successfully',
                    data: data[0]
                })
        }
    })
})

//show data berdasarkan id
router.get('/(:id)', function(req, res){
    let id = req.params.id

    //query
    connection.query(`SELECT * FROM post where id = ${id}`, function(err, data){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'internal server error'
            })
        }

        //jika data tidak ditemukan 
        if(data.length <= 0){
            return  res.status(404).json({
                status: false,
                message: 'data post not found'
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'post ada',
                data: data[0]
            })
        }
    })
})

//update data 
router.patch('/update/:id',[
    body('title').notEmpty(),
    body('content').notEmpty(),
], function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }
    let id = req.params.id;

    //initialise form data
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    connection.query(`UPDATE post SET ? WHERE id=${id}`, formData, (err, data) => {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'internal server error'
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'update data successfully'
            })
        }
    })
})

router.delete('/delete/:id', function(req,res){
    let id = req.params.id

    connection.query(`DELETE FROM post WHERE id = ${id}`, function(err,data){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'internal server error'
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Delete data successfully'
            })
        }
    })
})

module.exports = router;