const { isValidObjectId } = require("mongoose")
const InternModel = require("../Models/InternModel")
const collegeModel = require("../Models/collegeModel")


const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


const createIntern = async function (req, res) {
    try {
        let body = req.body
        const { Name, email, Mobile, collegeName } = body

        if (Object.keys(body).length == 0) {
            res.status(400).send({ status: false, msg: "Please Provide required Info" })
            return
        }

        if (!isValid(Name)) {
            res.status(400).send({ status: false, msg: "please enter Intern name" })
            return
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: "please enter email address" })
            return
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, msg: "please enter valid email address" })
            return
        }

        let usedEmail = await InternModel.findOne({ email:email })

        if (usedEmail) {
            res.status(400).send({ status: false, msg: `this ${email} is already used` })
            return
        }

        if (!isValid(Mobile)) {
            res.status(400).send({ status: false, msg: "please enter mobile no." })
            return
        }

        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(Mobile))) {
            res.status(400).send({ status: false, msg: "plese enter valid mobile no" })
            return
        }

        let usedMobile = await InternModel.findOne({ Mobile })

        if (usedMobile) {
            res.status(404).send({ status: false, msg: `this ${Mobile} is already used` })
            return
        }


        if (!isValid(collegeName)) {
            res.status(400).send({ status: false, msg: "please enter collage name" })
            return
        }



        let collegeDetails = await collegeModel.findOne({name:collegeName})

        if(!collegeDetails) {
            res.status(404).send({status:false,msg:"No such collegeName exist"})
            return
        }
        
        let collegeId = collegeDetails._id
        let data = { Name, email, Mobile, collegeId}

        const internDetails = await InternModel.create(data)
        
        res.status(201).send({status:true, msg:"interns created successfully", data: internDetails})
        
    }
    catch (error) {
        console.log(error)
        res.status(500).send({status:false,msg:error.message})

    }
}



module.exports.createIntern = createIntern