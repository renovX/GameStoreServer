import Profile from "../model/Profile.js";

const profileController = {
  addGame: async (req, res) => {
    try {
      const { game } = req.body;
    } catch (e) {
      res.send(e.message);
    }
  },
};
