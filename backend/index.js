const express = require("express")
const cors = require("cors")
const axios = require("axios");
require("colors")
const port = 3001

const app = express()
app.use(express.json())
app.use(cors({ origin: true }))

app.post("/authenticate", async (req, res) => {
  const { username } = req.body // ? Take username from request body

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/", // ? Get user if exist  from chatengine API endpoint
      { username: username, secret: username, first_name: username }, // ? otherwise create from scratch
      { headers: { "Private-Key": "87905c55-4412-4d0e-b85c-463160428f6b" } }
    )
    return res.status(r.status).json(r.data) // ? Take status of API and data within
  } catch (e) {
    return res.status(e.response.status).json(e.response.data) // ? Take status of API and data within
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`.yellow.underline)
})
