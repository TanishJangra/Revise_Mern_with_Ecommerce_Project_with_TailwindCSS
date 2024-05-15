async function allUsers(req,res){
    try {
        console.log("userId", req.userId)
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports= allUsers