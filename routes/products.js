const express = require('express');
const router = express.Router();
// const products = require('../Models/products')
const products = require('../Models/products')



router.get('/products', async (req, res) => {
  try {
    let a = await products.findAll()
    return res.status(200).send({
      'products': a
    })
  } catch (e) {
    return res.status(500).send(e)
  }
})

router.post('/products/add', async (req, res) => {

  try {

    const { name, description, productImage, date, brand, cost } = req.body;
    // console.log('.....', name, description, productImage, date, brand, cost)
    if (!name || !description || !productImage || !date || !brand || !cost) {
      return res.status(400).json({
        err: 'Provide the all details'
      })
    }

    let newProduct = await products.create({
      name, description, productImage, date, brand, cost
    })

    return res.status(201).send(newProduct)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ e })
  }

})



router.get('/products/:id', async (req, res) => {

  try {
    let a = await products.findOne({
      where: {
        id: req.params.id
      }
    })
    if (!a) {
      return res.status(404).send({
        err: "Product not found"
      })
    }
    return res.status(200).send(a)
  } catch (e) {
    return res.status(500).send(e)
  }
})


router.put('/products/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    let a = await products.findOne({ where: { id: req.params.id } })
    console.log('aaa', a)
    if (!a) {
      return res.status(404).json({
        err: 'Product not found'
      })
    }

    a.update({
      name: req.body.name,
      description: req.body.description,
      productImage: req.body.productImage,
      date: req.body.date,
      brand: req.body.brand,
      cost: req.body.cost
    })
    console.log('>>>', a)
    return res.status(200).send(a)

  } catch (e) {

  }
})


router.delete('/products/:id', async (req, res) => {
  try {
    let a = await products.findOne({ where: { id: req.params.id } });
    if (!a) {
      return res.status(404).json({ err: 'Not found' })
    }
    console.log('aaa', a)
   const deleteProduct =  await a.destroy({ where: {id: req.params.id}})
    console.log('rows deleted')
    return res.status(200).send()

  } catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
})

module.exports = router