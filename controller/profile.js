import Profile from "../model/Profile.js";
import Game from "../model/Game.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
function cookieParser(cookieString) {
  if (cookieString === "") return {};
  let pairs = cookieString.split(";");
  let splittedPairs = pairs.map((cookie) => cookie.split("="));
  const cookieObj = splittedPairs.reduce(function (obj, cookie) {
    obj[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(
      cookie[1].trim()
    );

    return obj;
  }, {});

  return cookieObj;
}
const profileController = {
  getData: async (req, res) => {
    //console.log(req.cookies);
    try {
      if (req.cookies.token) {
        res.setHeader("Access-Control-Allow-Credentials", true);
        const tokenData = JSON.parse(atob(req.cookies.token.split(".")[1]));
        const profile = await Profile.findOne({ email: tokenData.email });
        res.send(profile);
        //res.send("Hi");
        console.log("Data sent succesfully");
      } else {
        console.log("Data failed");
        res.sendStatus(401);
      }
      //const email = req.body;
      // const cookieObj = cookieParser(req.cookies);
      //if (cookieObj.token) res.send(cookieObj.token);
      /*const profile = await Profile.findOne({
        email: email,
      });
      if (profile) res.send(profile);*/
    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const profile = await Profile.findOne({ email: email });
      if (!profile) return res.send("Invalid Email");
      //verifying password
      if (bcrypt.compare(password, profile.password)) res.send("found");
      else res.send("Not found");
    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  },
  addToLibrary: async (req, res) => {
    try {
      res.setHeader("Access-Control-Allow-Credentials", true);
      //const { email, cartItems } = req.body;
      //console.log("Token is:" + req.cookies.token);
      const email = JSON.parse(atob(req.cookies.token.split(".")[1])).email;
      console.log("email is:" + email);
      const profile = await Profile.findOne({ email: email });

      const cartItems = profile.cart;

      console.log(cartItems);
      const gameList = await Promise.all(
        cartItems.map(async (item) => {
          var id = mongoose.Types.ObjectId(item.id);
          return await Game.findById(id);
        })
      );
      console.log(cartItems);
      console.log(gameList);

      const library = profile.libraryGames.concat(gameList);
      await Profile.findOneAndUpdate(
        { email: email },
        { libraryGames: library, cart: [] }
      );
      res.send("Update Success");
      console.log("Added to Library");
    } catch (e) {
      res.send(e.message);
      console.log(e);
    }
  },
  update: async (req, res) => {
    try {
      const { name, email, password, phone, addr } = req.body;
      console.log(password);
      const encrypted_pass = await bcrypt.hash(password, 10);
      const profile = await Profile.findOneAndUpdate(
        { email: email },
        { name: name, password: encrypted_pass, phone: phone, address: addr }
      );
      res.send(profile);
    } catch (e) {
      res.send(e.message);
    }
  },
};
export default profileController;
