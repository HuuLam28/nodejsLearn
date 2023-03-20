exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: "getAllUsers",
        message: 'ok',
    });
}
exports.createUsers = (req, res) => {
    res.status(200).json({
        status: "createUsers",
        message: 'ok',
    });
 }
exports.getUser = (req, res) => {
    res.status(200).json({
        status: "getUser",
        message: 'ok',
    });
};
exports.updateUser = (req, res) => {
    res.status(200).json({
        status: "updateUser",
        message: 'ok',
    });
};
exports.deleteUser  = (req, res) => {
    res.status(200).json({
        status: "deleteUser",
        message: 'ok',
    });
};