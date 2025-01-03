const User = require("../Models/User");
const UserToken = require("../Models/UserToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transport = require("../Config/nodemailer.config");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      genred: [],
    });

    await newUser.save();

    const verificationPayload = {
      userId: newUser._id,
    };

    const verificationToken = jwt.sign(
      verificationPayload,
      process.env.SECRET,
      {
        expiresIn: 30 * 60,
      }
    );

    const userToken = new UserToken({
      userId: newUser._id,
      token: verificationToken,
    });

    await userToken.save();

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Account Verification",
      html: `Herzlich Willkommen beim BookTracker, <br><br>Bitte klicke auf den folgenden Link um die Registireung abzuschließen: <br><br><a href="${process.env.BASE_URL}/verify-email/${verificationToken}">${process.env.BASE_URL}/verify-email/${verificationToken}`,
    };

    try {
      await transport.sendMail(mailOptions);
      res
        .status(200)
        .json({ message: "User registered. Verification E-Mail sent." });
    } catch (err) {
      res.status(500).json({ error: "Sending verification E-Mail failed." });
    }
  } catch (err) {
    res.status(500).json({ error: "Could not register the user." });
  }
};

exports.verifyEmail = async (req, res) => {
  const verificationToken = req.params.token;
  console.log(verificationToken);
  try {
    const verifyEmailPayload = jwt.verify(
      verificationToken,
      process.env.SECRET
    );

    const user = await User.findById(verifyEmailPayload.userId);

    if (!user) {
      return res.status(400).json({ error: "Invalid token." });
    }

    user.verified = true;
    await user.save();

    await UserToken.deleteOne({ token: verificationToken });

    res.status(200).json({ error: "E-Mail verified succesfully." });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error verifying E-Mail. Please try again." });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    const tokenPayload = { userId: user._id };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
  } catch (err) {
    res.status(500).json({ message: "Could not log in", error: err.message });
  }
};
