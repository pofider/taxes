import Invoice from './invoice'
import { computed, observable } from 'mobx'
import { addDays } from '../utils'
const initialDate = new Date(2017, 7 - 1, 7)

export default () => {
  const invoices = []
  let accountingMonthStart = new Date()
  accountingMonthStart.setDate(1)
  accountingMonthStart.setMonth(accountingMonthStart.getMonth() - 1)

  let date = new Date(initialDate)

  let counter = 1
  while (addDays(date, 7 * counter) < accountingMonthStart) {
    counter++
  }

  let accountingMonthEnd = new Date()
  accountingMonthEnd.setDate(1)
  accountingMonthEnd.setHours(0, 0, 0, 0)

  while (addDays(date, 7 * counter) < accountingMonthEnd) {
    invoices.push(Invoice(`${accountingMonthStart.getFullYear()}-${counter + 1}G`, addDays(date, 7 * counter)))
    counter++
  }

  return ({
    invoices: observable(invoices),
    incomes: computed(function () {
      let sumAmount = 0
      for (let g of this.invoices) {
        if (g.amountCZK) {
          sumAmount += g.amountCZK
        }
      }

      return sumAmount
    }),
    toJS () {
      return this.invoices.map((g) => g.toJS())
    }
  })
}
