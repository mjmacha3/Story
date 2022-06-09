const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName

      }
    }]
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/217db3456b";
  option={
    method:"POST",
    auth: "mjmacha3:abacad2164d08607ba184c75bc0704ae-us10"
  };
  const request = https.request(url, option, function(response) {
    if (response.statusCode ===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");

    }
      response.on("data",function(data){
        //console.log(JSON.parse(data));
      });
  });
 request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res){
console.log("failed");
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on PORT 3000");
});
//audienceid
//217db3456b
//apiKey
// abacad2164d08607ba184c75bc0704ae-us10
