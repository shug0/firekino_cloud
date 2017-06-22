const animals = require('./animals.js');

const utils = {

  getAnimal: function getAnimal(id) {
    return animals[id]
  }

}

module.exports = utils;
