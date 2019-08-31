const chalk = require("chalk");
const bcrypt = require("bcrypt");
const util = require("util");

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

  async isChainLegit() {
    for (let i = 1; i < this.chain.length - 1; i++) {
      if (this.chain[i].hash !== this.chain[i + 1].previousHash) {
        return false;
      }
      const compareProm = util.promisify(bcrypt.compare);
      const textToHash =
        this.chain[i].index +
        this.chain[i].date +
        JSON.stringify(this.chain[i].data);
      return await compareProm(textToHash, this.chain[i].hash);
    }
    return true;
  }
}

const myChain = new createChain();
myChain.addBlock(1, "01/01/2018", { value: 10 });
myChain.addBlock(2, "01/01/2018", { value: 15 });
console.log(myChain);

myChain.isChainLegit().then(res => console.log(res));

// change the value of the chain and test it
myChain.chain[1].data = { value: 5000 };
console.log(myChain);
myChain.isChainLegit().then(res => console.log(res)); // false
