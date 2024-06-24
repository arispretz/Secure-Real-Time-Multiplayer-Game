export const collectibleWidth = 20;
export const collectibleHeight = 20;

class Collectible {
  constructor({ x, y, value, id }) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.id = id;
  }
}

try {
  module.exports = Collectible;
} catch (e) {}

export default Collectible;
