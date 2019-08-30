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
class Block {
  constructor(index, date, data, previousHash = "") {
    (this.index = index),
      (this.date = date),
      (this.data = data),
      (this.previousHash = previousHash),
      (this.hash = this.calculHash());
  }

  calculHash() {
    const textToHash = this.index + this.date + JSON.stringify(this.data);
    return bcrypt.hashSync(textToHash, 10); // extToHash, salt
  }
}

class createChain {
  constructor() {
    this.chain = [new Block(0, "01/01/2019", {})];
  }

  getLastestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * @param {Number} index
   * @param {String} date
   * @param {Data} data
   */
  addBlock(index, date, data) {
    const block = new Block(index, date, data);
    block.previousHash = this.getLastestBlock().hash;
    this.chain.push(block);
  }
}

const myChain = new createChain();
console.log(myChain);

myChain.addBlock(1, "01/01/2018", { value: 10 });
myChain.addBlock(2, "01/01/2018", { value: 15 });
console.log(myChain);
