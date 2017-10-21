const fetch = require('node-fetch')

const currencyCache = {}

module.exports = async function quotation (date) {
  if (currencyCache[date]) {
    return currencyCache[date]
  }

  const response = await fetch(`http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt?date=${date}`)
  const stringResponse = await response.text()

  if (stringResponse.indexOf('USD') === -1) {
    return 0
  }

  const fragments = stringResponse.split('|')
  let i = 0
  while (fragments[i++] !== 'USD') { }

  currencyCache[date] = parseFloat(fragments[i].split('\n')[0].replace(',', '.'))
  return currencyCache[date]
}
