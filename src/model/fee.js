import Invoice from './invoice'
import { computed } from 'mobx'

export default (getSum) => Object.assign(Invoice(), {
  amountCZK: computed(function () {
    return Math.round(getSum() * 0.23)
  })
})
