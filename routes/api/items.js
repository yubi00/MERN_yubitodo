const express = require('express')
const Router = express.Router()
const auth = require('../../middleware/auth')

//Item Model
const Item = require('../../models/Item')

//@route GET api/items
//@desc GET all items
//@access public
Router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

//@route POST api/items
//@desc Create a Item
//@access public
Router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save()
        .then(item => res.json(item))
})

//@route DELETE api/items/:id
//@desc Delete a item
//@access public
Router.delete('/:id', auth,  (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = Router
