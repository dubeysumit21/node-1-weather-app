const request = require('request')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sumit Dubey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sumit Dubey'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sumit Dubey',
        message: 'You can get help here.'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You need to provide an Address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (Req, res) => {
    res.render('Error', {
        title: '404',
        error: 'Help article not found.',
        name: 'Sumit Dubey'
    })
})

app.get('*', (Req, res) => {
    res.render('Error', {
        title: '404',
        error: 'Page Not Found',
        name: 'Sumit Dubey'
    })
})

app.listen(3000, () => {
    console.log('Web Server started.')
})