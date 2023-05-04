import express from "express";
import mongoose from "mongoose";
import Game from "../model/Game.js";
import db from "../config.js";
const gameController = {
  addGame: async (req, res, next) => {
    const gameinfo = req.body;
    try {
      const gamedoc = await db.collection("gameinfo").insertOne(gameinfo);
      console.log("recieved");
      res.send("OK");
    } catch (e) {
      res.send(e);
    }
  },
  getGame: async (req, res, next) => {
    //const game_name = mongoose.Types.ObjectId(req.params["name"]);
    const game_name = req.params["name"];
    //const { id } = req.params;
    console.log("Id " + req.params["name"]);
    try {
      /*const gameDoc = await db
        .collection("gameinfo")
        .findOne({ _id: game_name });*/
      const gameDoc = await Game.findOne({ name: game_name });
      if (gameDoc) {
        console.log("type: " + Array.isArray(gameDoc.systemreq));
        console.log(gameDoc);
        res.send(gameDoc);
      } else {
        console.log("NotFound");
        //res.send("NotFound");
      }
    } catch (e) {
      console.log("Error:" + e);
      res.send(e);
    }
  },
};
export default gameController;
