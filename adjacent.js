var turf = require('turf')
var churches = require('./properties.json')
var zones = require('./zoning.json')
var densities = require('./densities.json')

for (var i = 0; i < zones.features.length; i++) {
    for (var j = 0; j < churches.features.length; j++) {
        var z1 = zones.features[i]
        var c1 = churches.features[j]
        var conflict
        try {
            conflict = turf.intersect(c1, z1);
        } catch (err) {
            continue
        }
        if (conflict) {
            // console.log(z1.properties.ZONE_CODE)
            if (!c1.properties.adjacentZones) c1.properties.adjacentZones = []
            c1.properties.adjacentZones.push(z1.properties.ZONE_CODE)
        }
    }
 }

churches.features.map((f) => {
    var highest
    f.properties.adjacentZones.map((z) => {
        if (!highest) highest = z
        var val = densities[z]
        var highestVal = densities[highest]
        if (val > highestVal) highest = z
    })
    console.log(highest)
    // console.log(f.properties.adjacentZones.join(','))
})
