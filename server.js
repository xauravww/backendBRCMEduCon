import express from "express"

const app = express()

app.get("/", (req, resp) => {
  resp.send({ status: "Sucess Achieved" })
})

app.listen(9000)
