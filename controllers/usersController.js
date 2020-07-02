const User = require("../models/user");
const passwordHash = require("password-hash");

module.exports = {
   register: (req, res) => {
      const { password, email } = req.body;
      if (!email || !password) {
         //If email and password is empty/null or undefined
         return res.status(400).json({
            "message": "Invalid query"
         });
      }
      // Create objet User and hash this password
      const user = {
         email,
         password: passwordHash.generate(password)
      };
      // Check in the database if user exist
      User.findOne({
         email: email
      })
      .then((findUser)=>{
         if(findUser !== null) {
            return res.status(400).json({"message": "User already exist"});
         }
         //insert new User in database
         const newUser = new User(user);
         newUser.save()
         .then((newUser) => {
            return res.status(200).json({
               message: "Success",
               token: userObject.getToken()
            });
         })
         .catch((error) => { return res.status(500).json({ error })});
      })
      .catch ((error) => { return res.status(500).json({ error })});
   },
   login: (req, res) => {
      const { password, email } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Invalid Query"
        });
      }
      User.findOne({ email })
      .then((findUser)=>{
         if(!findUser) {
            return res.status(401).json({
            message: "User does not exist"
          });
         }
         if(!findUser.authenticate(password))
          return res.status(401).json({
            message: "Password is incorrect"
          });
        return res.status(200).json({
          token: findUser.getToken(),
          message: "successful authentication"
        });
      })
      .catch((error)=> res.status(500).json({message:"Error "}))
   }
}