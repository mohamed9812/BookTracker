const User = require("../Models/User");

exports.getUserInformation = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }


        res.status(200).json({ username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
