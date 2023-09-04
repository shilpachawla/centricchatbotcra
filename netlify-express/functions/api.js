const express = require("express");
import axios from "axios";
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
router.get("/", (req, res) => res.send("Hello World!"));
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const chatEngineResponse = await axios.get(
//       "https://api.chatengine.io/users/me",
//       {
//         headers: {
//           "Project-ID": process.env.PROJECT_ID,
//           "User-Name": username,
//           "User-Secret": password,
//         },
//       }
//     );

//     res.status(200).json({ response: chatEngineResponse.data });
//   } catch (error) {
//     console.error("error", error);
//     res.status(500).json({ error: error.message });
//   }
// });
app.use("/", router);
export const handler = serverless(app);
