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
  amountCZK: 0,
  amountUSD: 0,
  amountEUR: 0,
  dic: '',
  date: date || new Date(),
  id: id,

  updateAmountUSD (amount) {
    this.amountUSD = safeParse(amount)
    conversion(this)
  },
  updateAmountEUR (amount) {
    this.amountEUR = safeParse(amount)
    conversion(this)
  },
  updateAmountCZK (amount) {
    this.amountCZK = safeParse(amount)
  },
  updateDIC (dic) {
    this.dic = dic
  },
  updateDate (date) {
    try {
      const fragments = date.split('.')
      this.date = new Date(parseInt(fragments[2]), parseInt(fragments[1]) - 1, parseInt(fragments[0]))
    } catch (e) {
      this.date = new Date()
    }

    conversion(this)
  },
  toJS () {
    return {
      amountCZK: this.amountCZK,
      amountUSD: this.amountUSD,
      amountEUR: this.amountEUR,
      date: this.date,
      dic: this.dic,
      id: this.id
    }
  }
})
