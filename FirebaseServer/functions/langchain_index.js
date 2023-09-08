// import { OpenAI } from "langchain/llms";
// import { RetrievalQAChain } from "langchain/chains";
// import { HNSWLib } from "langchain/vectorstores";
// import { OpenAIEmbeddings } from "langchain/embeddings";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// // import * as fs from "fs";
// import * as dotenv from "dotenv";

const { OpenAI } = require("langchain/llms");
const { RetrievalQAChain } = require("langchain/chains");
const { HNSWLib } = require("langchain/vectorstores");
const { OpenAIEmbeddings } = require("langchain/embeddings");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { existsSync, readFileSync } = require("fs");

//dotenv.config();

const txtFilename = "H1B_Databook";
const txtPath = `./data/${txtFilename}.txt`;
const VECTOR_STORE_PATH = `./data/${txtFilename}.index`;

const runWithEmbeddings = async (question) => {
  const model = new OpenAI({});

  let vectorStore;
  if (existsSync(VECTOR_STORE_PATH)) {
    console.log("Vector Exists..");
    vectorStore = await HNSWLib.load(VECTOR_STORE_PATH, new OpenAIEmbeddings());
  } else {
    const text = readFileSync(txtPath, "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([text]);
    vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    await vectorStore.save(VECTOR_STORE_PATH);
  }

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  return await chain.call({
    query: question,
  });
};
module.exports = { runWithEmbeddings };
