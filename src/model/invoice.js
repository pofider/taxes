import { formatCZDate } from '../utils.js'
import conversion from './conversion.js'

function safeParse (str) {
  try {
    return parseFloat(str)
  } catch (e) {
    return 0
  }
}

export default (id, date) => ({
  amountStrCZK: '0',
  amountStrUSD: '0',
  amountStrEUR: '0',
  dateStr: formatCZDate(date || new Date()),
  amountCZK: 0,
  amountUSD: 0,
  amountEUR: 0,
  id: id,
  get date () {
    try {
      const fragments = this.dateStr.split('.')
      return new Date(parseInt(fragments[2]), parseInt(fragments[1]) - 1, parseInt(fragments[0]))
    } catch (e) {
      return new Date()
    }
  },
  updateAmountUSD (amount) {
    this.amountStrUSD = amount
    this.amountUSD = safeParse(amount)
    conversion(this)
  },
  updateAmountEUR (amount) {
    this.amountStrEUR = amount
    this.amountEUR = safeParse(amount)
    conversion(this)
  },
  updateAmountCZK (amount) {
    this.amountStrCZK = amount
    this.amountCZK = safeParse(amount)
  },
  updateDate (date) {
    this.dateStr = date

    conversion(this)
  }
})
