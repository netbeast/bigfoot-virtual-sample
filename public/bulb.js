var color = document.getElementById('color')
var power = document.getElementById('power')
var bulb = document.getElementById('bulb')
var button = document.getElementById('run-btn')
var light = document.getElementById('light')

button.onclick = function toggleBulbState () {
  changeBulbParams({ color: color.value, power: power.value })
}

function setBulbParams (params) {
  console.log('Called setBulbParams with', params)

  if (params.power === 'false') {
    // If power is a parameter and has a falsy value
    params = { color: 'E7E7E7' }
  }

  var bulb_parts = ['.bulb.middle-1', '.bulb.middle-2', '.bulb.middle-3']

  document.querySelector('.bulb.top').style.boxShadow = '0px 0px 98px #' + params.color

  document.querySelector('.bulb.top').style.backgroundColor = params.color
  document.querySelector('.bulb.bottom').style.backgroundColor = params.color
  bulb_parts.forEach(function (className) {
    document.querySelector(className).style.borderTopColor = params.color
  })
}

function changeBulbParams (params) {
  /* Overwrite html fields if necessary */
  color.value = params.color !== undefined ? params.color : color.value
  power.value = params.power !== undefined ? params.power : power.value
  setBulbParams({ color: color.value, power: power.value })
}
