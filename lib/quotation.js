const fetch = require('node-fetch')

const currencyCache = {}

module.exports = async function quotation (date, currency) {
  if (currencyCache[date + currency]) {
    return currencyCache[date + currency]
  }

  const response = await fetch(`http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt?date=${date}`)
  const stringResponse = await response.text()

  if (stringResponse.indexOf('USD') === -1) {
    return 0
  }

  const fragments = stringResponse.split('|')
  let i = 0
  while (fragments[i++] !== currency) { }

  currencyCache[date + currency] = parseFloat(fragments[i].split('\n')[0].replace(',', '.'))
  return currencyCache[date + currency]
}
