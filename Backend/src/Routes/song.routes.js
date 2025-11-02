const express = require("express")
const song = require("../models/song.model")
const router = express.Router()
const multer = require("multer")


const songModel = require("../models/song.model")
const uploadFile = require("../service/storage.service")
const upload = multer({storage:multer.memoryStorage()})
router.post('/song',upload.single("audio"), async(req,res)=>{
        
    console.log(req.body)
    console.log(req.file)
const filedata = await uploadFile(req.file)
    
const song = await songModel.create({
    title:req.body.title,
    artist:req.body.artist,
    audio:filedata.url,
    mood:req.body.mood
})

    res.json({
        message:"Song Created Successfully",
        song:song
    })
})


router.get('/song', async(req,res)=>{

    const {mood} = req.query

    const songs = await songModel.find({
        mood:mood
    })
    res.status(200).json({
        message:"Song Fetched Successfully",
        song:songs
    })
})

module.exports=router
