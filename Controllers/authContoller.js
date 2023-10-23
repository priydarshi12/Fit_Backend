const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

// REGISTRATION
module.exports.registerController = async (req, res, next) => {
  try {
    const { fname, lname, email, height, weight, password } = req.body;

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fname,
      lname,
      email,
      height,
      weight,
      password: hashed,
    });
    
    return res.json({ msg: "successfully registered", status: true });
  } catch (ex) {
    res.send({ msg: "some error has occurred", status: false });
  }
};

// LOGIN

module.exports.loginController = async (req, res, next) => {
  const { fname, lname, password, email } = req.body;

  try {
    const user = await User.findOne({ email });
   
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user) {
      if (user.fname !== fname) {
        return res.json({
          msg: "Please enter correct First Name",
          status: false,
        });
      } else if (user.lname !== lname) {
        return res.json({
          msg: "Please enter correct last Name",
          status: false,
        });
      }
      
      else if (!isPasswordValid) {
        res.send({ msg: "Wrong Password", status: false });
      }
      else{
        const toSend={
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          height: user.height,
          weight: user.weight,
        }
      
        res.send({ msg: "Login Successfully", status: true,toSend }); 
      }
    } else {
      
      return res.json({ msg: "User not found", status: false });
    }
  } catch (err) {
   
    return res.json({ msg: "Some error has occured", status: false });
  }
};
