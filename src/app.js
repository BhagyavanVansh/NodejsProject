const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 8000;


// public static path 
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../tamplates/views');
const partialsPath = path.join(__dirname, '../tamplates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));




app.get('/', (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/weather', (req, res) => {
    res.render("weather");
});

app.get('*', (req, res) => {
    res.render("404",  {
        errorMsg: "Page Not Found",
    });
});

app.listen(port, () => {
    console.log("listening...!");
})