module.exports = (app) => {
app.post('/login', (req, res) => {
    res.send({
        message: `Hello ${req.body.email} P7-OC`
    })
})
}