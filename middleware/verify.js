import jwt from "jsonwebtoken";
import express from "express";

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header["Authorization"];
  req.token = bearerHeader;
};

export default function verify(req, res, next) {
  const token = req.cookies.token;
  console.log("fetched token:" + token);
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log("Unauthorized");
      res.sendStatus(403);
    } else {
      //res.send("Authorized");
      next();
    }
  });
}
