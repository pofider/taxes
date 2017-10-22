import Invoice from './invoice'
import { computed } from 'mobx'

export default (getSum) => Object.assign(Invoice(), {
  amountCZK: computed(function () {
    return Math.round(getSum() * 0.23)
  }),
  amountStrCZK: computed(function () {
    return Math.round(getSum() * 0.23) + ''
  }),
  dic: '8501274529',
  toJS () {
    return {
      amountCZK: this.amountCZK,
      amountUSD: this.amountUSD,
      amountEUR: this.amountEUR,
      dic: this.dic,
      date: this.date,
      id: this.id
    }
  }
})
