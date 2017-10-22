import { formatCZDate } from '../utils'

const cache = {}
export default async function (obj) {
  if (cache[obj.date]) {
    obj.amountCZK = parseFloat((cache[obj.date] * obj.amount).toFixed(2))
    return
  }

  const response = await fetch(`api/czk/${formatCZDate(obj.date)}`)
  const quotation = await response.json()
  cache[obj.date] = quotation
  obj.amountCZK = parseFloat((quotation * obj.amount).toFixed(2))
}
