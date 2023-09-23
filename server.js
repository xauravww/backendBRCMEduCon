import express from "express"
import "./config.js"
import Product from "./product.js"

const app = express()
app.use(express.json())

app.post("/create", async (req, resp) => {
  let data = new Product(req.body)
  let result = await data.save()
  console.log(result)
  resp.send("Done")
})

app.get("/list", async (req, resp) => {
  let data = await Product.find()
  console.log(data)
  resp.send(data)
})

app.delete("/delete/:_id", async (req, resp) => {
  const data = await Product.deleteOne(req.params)

  resp.send(data)
})

app.put("/delete/:_id", async (req, resp) => {
  const data = await Product.updateOne(req.params, {
    $set: req.body
  })

  resp.send(data)
})

app.listen(5000)
