import { formatCZDate } from '../utils'

const cache = {}
export default async function (obj) {
  const currency = obj.amountUSD ? 'USD' : 'EUR'

  if (cache[obj.date + currency]) {
    obj.amountCZK = parseFloat((cache[obj.date + currency] * obj['amount' + currency]).toFixed(2))
    return
  }

  const response = await fetch(`api/${currency}/${formatCZDate(obj.date)}`)
  const quotation = await response.json()
  cache[obj.date + currency] = quotation
  obj.amountCZK = parseFloat((quotation * obj['amount' + currency]).toFixed(2))
}
