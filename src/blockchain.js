const chalk = require("chalk");
const bcrypt = require("bcrypt");

// @ts-ignore
console.log(chalk`{cyan Super crypto currency}`);

/**
 * data structure
 * @typedef {Object} Data
 * @property {Number} value
 */

/**
 * @param {Number} index
 * @param {String} date
 * @param {Data} data
 */
class createBlock {
  constructor(index, date, data, previousHash = "") {
    (this.index = index),
      (this.date = date),
      (this.data = data),
      (this.previousHash = previousHash);
    this.hash = this.calculHash();
  }

  async calculHash() {
    const textToHash = this.index + this.date + JSON.stringify(this.data);
    return bcrypt.hashSync(textToHash, 10); // extToHash, salt
  }
}

const myBlock = new createBlock(0, "01/01/2019", { value: 5 });
console.log(myBlock);
