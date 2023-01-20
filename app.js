//  jshint eversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }
            ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/7db28b22b6";
    const options = {
        method: "POST",
        auth: "moyo7:c9f52bf5f4d2d41617c920a358b7a6fe-us12"
    }

    const request = https.request(url, options, function(response){
              if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
        response.on("data", function(data){
            console.log(JSON.parse(data));

      
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

//API keys
// c9f52bf5f4d2d41617c920a358b7a6fe-us12

//List Id 
//  7db28b22b6