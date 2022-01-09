const express = require("express")
const app = express();
const ejs = require("ejs");
const nodemailer = require("nodemailer")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.use(express.static(__dirname))



app.get("/", (req, res) => {
    res.render('index.ejs')
})

app.post("/login", (req, res) => {

    const { email, password } = req.body

    let transporter = nodemailer.createTransport({
        port: 587,
        service: 'gmail',
        auth: {
            user: email, // generated ethereal user
            pass: password, // generated ethereal password
        },
    })

    let mailOptions = {
        from: email, // sender address
        to: "yoqubovbekmirza@gmail.com", // list of receivers
        subject: "Hello ✔️", // Subject line
        text: "Hello world?", // plain text body
        html: `
                  <p> Assalomu aleykum !! </p>

                  <h1> Bizning saytga hush kelibsiz !!</h1>

                  <span> Battar bo'ling! </span>

                  <h4> Biz ko'p gosht yep qoyammiz </h4>
              `, // html body
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        }

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    })

    res.send('Mail...')
})

app.listen(8000, () => console.log(8000))