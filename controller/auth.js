import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import jwt from "jsonwebtoken";
import axios from "axios";
import mongoose from "mongoose";
import Profile from "../model/Profile.js";
function createToken(profile) {
  return jwt.sign(
    { id: profile._id, email: profile.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "5min",
    }
  );
}

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      if (!(name, email, phone, password)) return res.send("Enter all details");
      const encrypted_pass = await bcrypt.hash(password, 10);
      const acc = await Profile.findOne({ email: email });
      if (acc) {
        return res.send("Account Exists");
      }
      const newProfile = await Profile.create({
        name: name,
        email: email,
        phoneNumber: phone,
        password: encrypted_pass,
        cart: [],
        address: ["", "", "", "", ""],
        libraryGames: [],
      });
      if (newProfile) res.send(newProfile);
      else res.status(500).send("Error");
    } catch (e) {
      res.status(500).send(e.message);
      console.log(e);
    }
  },

  logIn: async (req, res) => {
    //if (req.session.isAuth) return res.send("Already Logged In");
    const { email, password } = req.body;
    if (!(email && password))
      return res.status(401).send("Provide both email and password");
    /*const encrypted_pass = await bcrypt.hash(password, 10);
    await Profile.findOneAndUpdate(
      { email: email },
      { password: encrypted_pass }
    );*/
    const profile = await Profile.findOne({ email: email });
    if (profile && (await bcrypt.compare(password, profile.password))) {
      //valid email and password
      console.log("Success");
      const accessToken = jwt.sign(
        { id: profile._id, email: profile.email },
        process.env.JWT_SECRET,
        { expiresIn: "5min" }
      );
      console.log({ ...profile._doc, token: accessToken });
      //res.cookie("token", accessToken, { httpOnly: true, maxAge: 1000 * 120 });
      res.send({ ...profile._doc, token: accessToken });
    } else {
      console.log("Invalid email or password");
      res.status(401).send("Invalid email or password");
    }
  },
  googleLogin: async (req, res) => {
    const { user } = req.body;

    const resp = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      }
    );

    const { email, name } = resp.data;
    const profile = await Profile.findOne({ email: email });

    if (profile) {
      const accessToken = createToken(profile);
      res.send({ ...profile._doc, token: accessToken });
    } //create profile
    else {
      console.log("Creating");
      const newProfile = await Profile.create({
        name: name,
        email: email,
        password: "sample",
        phoneNumber: 0,
        cart: [],
        libraryGames: [],
        address: ["", "", "", "", ""],
      });
      const accessToken = createToken(newProfile);
      res.send({ ...newProfile._doc, token: accessToken });
    }
    console.log("Signed in with google");
  },
  logOut: async (req, res) => {
    //update cart
    try {
      const { cart, email } = req.body;

      await Profile.findOneAndUpdate({ email: email }, { cart: cart });

      console.log("Log Out Success");
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
    /*req.session.destroy((err) => {
      if (err) res.send(err);
      else res.send("Log Out Success");
    });*/
  },
};
export default authController;
