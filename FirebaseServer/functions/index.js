const express = require("express");
const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
//const { Configuration, OpenAIApi } = require("openai");
//onst { runWithEmbeddings } = require("./langchain_index.js");
const app = express();
console.log("cross origin setting");
app.use(cors({ origin: true }));
console.log("check if working");
// app.get("/timestamp", async (req, res) => {
//   console.log("chjhjhj");
//   res.send(`${Date.now()}`);
// });

//const router = express.Router();
//const openai = new OpenAIApi(configuration);
//dotenv.config();
// let corsOptions = {
//   origin: ["http://localhost:3000", "https://centricchatbot.web.app/"],
// };
app.use(express.json());
// app.use(cors({ origin: true }));
// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use(helmet());

// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(cors());
app.post("/auth", async (req, res) => {
  console.log("req here", req.body);
  try {
    const { username, password } = req.body;
    console.log(
      "check user and pssword",
      username,
      password,
      process.env.PROJECT_ID
    );
    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": "197bb0ea-3db7-4ac6-acd2-8f01ea670681",
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

// router.post("/centricSupport", async (req, res) => {
//   try {
//     const { text, activeChatId } = req.body;

//     const response = await runWithEmbeddings(text);

//     await axios.post(
//       `https://api.chatengine.io/chats/${activeChatId}/messages/`,
//       { text: response.text },
//       {
//         headers: {
//           "Project-ID": process.env.PROJECT_ID,
//           "User-Name": process.env.BOT_USER_NAME,
//           "User-Secret": process.env.BOT_USER_SECRET,
//         },
//       }
//     );

//     res.status(200).json({ text: response.text });
//   } catch (error) {
//     console.error("error", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/text", async (req, res) => {
//   try {
//     const { text, activeChatId } = req.body;

//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: text,
//       temperature: 0.5,
//       max_tokens: 2048,
//       top_p: 1,
//       frequency_penalty: 0.5,
//       presence_penalty: 0,
//     });

//     await axios.post(
//       `https://api.chatengine.io/chats/${activeChatId}/messages/`,
//       { text: response.data.choices[0].text },
//       {
//         headers: {
//           "Project-ID": process.env.PROJECT_ID,
//           "User-Name": process.env.BOT_USER_NAME,
//           "User-Secret": process.env.BOT_USER_SECRET,
//         },
//       }
//     );

//     res.status(200).json({ text: response.data.choices[0].text });
//   } catch (error) {
//     console.error("error", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/code", async (req, res) => {
//   try {
//     const { text, activeChatId } = req.body;

//     const response = await openai.createCompletion({
//       model: "code-davinci-002",
//       prompt: text,
//       temperature: 0.5,
//       max_tokens: 2048,
//       top_p: 1,
//       frequency_penalty: 0.5,
//       presence_penalty: 0,
//     });

//     await axios.post(
//       `https://api.chatengine.io/chats/${activeChatId}/messages/`,
//       { text: response.data.choices[0].text },
//       {
//         headers: {
//           "Project-ID": process.env.PROJECT_ID,
//           "User-Name": process.env.BOT_USER_NAME,
//           "User-Secret": process.env.BOT_USER_SECRET,
//         },
//       }
//     );

//     res.status(200).json({ text: response.data.choices[0].text });
//   } catch (error) {
//     console.error("error", error.response.data.error);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/assist", async (req, res) => {
//   try {
//     const { text } = req.body;

//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Finish my thought: ${text}`,
//       temperature: 0.5,
//       max_tokens: 1024,
//       top_p: 1,
//       frequency_penalty: 0.5,
//       presence_penalty: 0,
//     });

//     res.status(200).json({ text: response.data.choices[0].text });
//   } catch (error) {
//     console.error("error", error);
//     res.status(500).json({ error: error.message });
//   }
// });
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//app.use("/openai", router);
// app.use("/auth", router);
exports.app = functions.https.onRequest(app);
