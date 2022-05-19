module.exports = function() {
    var props = this.properties
    var geo = JSON.stringify(this.geometry)
    delete this.properties
    delete this.geometry
    Object.assign(this, props)
    this.geometry = geo
    // delete this
  }
