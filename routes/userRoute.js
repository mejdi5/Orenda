const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');


const isAuth = require('../middlewares/isAuth');

const {
  validator,
  registerRules,
  loginRules,
} = require('../middlewares/validator');



//@route POST api/user/register
//@desc Register new user
//@access Public
router.post('/register', registerRules(), validator, async (req, res) => {
  const { fullname, dateOfBirth, email, password, role } = req.body;
  
  try {
    
    // Check for existing user
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    } 
    // Create new User
    user = new User({ fullname, dateOfBirth, email, password, role });
    
    // Create Salt & hash
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    
    // Save the user
    await user.save();

    // sign user
    const payload = {
      id: user._id,
    };

    const token = await jwt.sign(payload, process.env.secretOrKey);

    res.status(200).send({ msg: 'User registred with success', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'Server Error', error });
  }
});




//@route POST api/user/login
//@desc Login User
//@access Public
router.post('/login', loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    
    // Check for existing user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: 'Bad Credentials! email' });
    }
    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: 'Bad Credentials! password' });
    }
    // sign user
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.secretOrKey);

    res.send({ msg: 'Logged in with success', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'Server Error' });
  }
});


//@route GET api/users/user
//@desc Get authentified user
//@access Private
router.get('/user', isAuth, (req, res) => {
  res.status(200).send({ user: req.user });
});


//@route GET api/users/allUsers
//@desc read users
//@access Public
router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

//@route GET api/users/user/id
//read one user's profile
//@access public
router.get('/user/:_id', async (req, res) => {
  const {_id}  = req.params;
  try {
    const user = await User.findOne({_id});
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});



//@route DELETE api/user/remove/id
//@desc delete a user
//@access Private
router.delete('/delete/:_id', async (req, res) => {
  const  _id  = req.params._id;
  try {
    const user = await User.findOneAndDelete({ _id });
    res.json({ msg: "user deleted", user });
  } catch (error) {
    console.log(error);
  }
});


//@route PUT api/users/update/id
//@desc edit a user
//@access Private
router.put("/update/:_id", async (req, res) => {

  const { _id } = req.params;
  const {photo, fullname, dateOfBirth, email, address, phoneNumber, password} = req.body
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  
  try {
    const user = await User.findByIdAndUpdate(_id, {photo, fullname, dateOfBirth, email, address, phoneNumber, password: hashedPassword});
    res.json({ msg: "user edited", user});
  } catch (error) {
    console.log(error);
  }
});


//@route POST api/users/addPost
//@desc create new post
//@access Public
router.post("/addPost", async (req, res) => {

  const {post} = req.body;
  
  try {
    const newPost = await User.findOne({post});
    const post = await newPost.save();
    res.json({ msg: "post added", post });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;