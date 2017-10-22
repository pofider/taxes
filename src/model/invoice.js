import { formatCZDate } from '../utils.js'
import conversion from './conversion.js'

export default (id, date) => ({
  amountStr: '0',
  dateStr: formatCZDate(date || new Date()),
  amountCZK: 0,
  id: id,
  get date () {
    try {
      const fragments = this.dateStr.split('.')
      return new Date(parseInt(fragments[2]), parseInt(fragments[1]) - 1, parseInt(fragments[0]))
    } catch (e) {
      return new Date()
    }
  },
  get amount () {
    try {
      return parseFloat(this.amountStr)
    } catch (e) {
      return 0
    }
  },
  updateAmount (amount) {
    this.amountStr = amount

    conversion(this)
  },
  updateDate (date) {
    this.dateStr = date

    conversion(this)
  }
})
