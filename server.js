let express = require("express");
let session = require("express-session");
let app = express();


const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('views', './public/views');
app.set('view engine', 'ejs');
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: true,
    })
);

let routes = require("./routes");
app.use("/", routes);

// http://localhost:3000/
app.listen(port, function () {
    console.log(`Server is running on port ${port} ...`);
});

