const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});


app.post("/", function(req, res) {
    const f_name = req.body.firstname;
    const l_name = req.body.lastname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: f_name,
                    LNAME: l_name
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url =  'https://us8.api.mailchimp.com/3.0/lists/b1a8b6dc2d';

    const options =   {
        method: "POST",
        auth: "ananyaP:beee46b94728c208f12c62a081550961-us8"
    }
    const request = https.request(url, options, function(response) {
        
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

     
});

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 , function() {
    console.log("Server started on port 3000 !");
})

// beee46b94728c208f12c62a081550961-us8

// b1a8b6dc2d
