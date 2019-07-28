const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VtaXRkdWJleSIsImEiOiJjanlhYWRhMmgwMnVvM251cTluaWxyM3p5In0.Xstp6JOOdR5OmohaevIDCA'

    request({url:url, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect to Location Services!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find Location Services. Try another search.', undefined)
        } else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode