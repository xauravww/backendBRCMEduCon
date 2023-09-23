import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String
})

export default mongoose.model("products", productsSchema)
