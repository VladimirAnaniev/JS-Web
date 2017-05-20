let products = []

module.exports.products = {}

module.exports.products.getAll = () => {
  return products
}

module.exports.products.add = (product) => {
  products.push(product)
}
