import { observable, action, computed, Atom, reaction } from 'mobx'
import { asyncComputed } from 'computed-async-mobx'
import { addDays } from './utils.js'

class Gumroad {
    @observable id
    @observable amount
    @observable date

    amountCZK = asyncComputed(0, 500, async () => {
      if (!this.amount) {
        return 0
      }

      const response = await fetch(`api/czk/${this.date}`)
      const quotation = await response.json()
      return parseFloat((quotation * this.amount).toFixed(2))
    })

    constructor (id, date) {
      this.id = id
      this.date = date
      this.amount = 0
    }
}

class Fee {
  @observable date

  constructor (gumroadSumCZK) {
    this.date = new Date()
    this.gumroadSumCZK = gumroadSumCZK
    console.log(this.gumroadSumCZK)
  }

  amountCZK = asyncComputed(0, 100, async () => {
    return Math.round(this.gumroadSumCZK.get() * 0.23)
  })
}

class Peru {
  @observable dateStr
  @observable amount

  @computed get date () {
    try {
      return new Date(this.dateStr)
    } catch (e) {
      return new Date()
    }
  }

  constructor () {
    this.dateStr = new Date().toLocaleDateString('cz')
    this.amount = 0
  }
}

class Invoice {
  @observable amount

  constructor () {
    this.amount = 0
  }
}

const initialDate = new Date(2017, 7 - 1, 7)
export class Store {
    @observable gumroad
    @observable fee
    @observable peru
    @observable invoicesCZ

    gumroadSumCZK = asyncComputed(0, 100, async () => {
      let sumAmount = 0
      for (let g of this.gumroad) {
        if (g.amountCZK.get()) {
          sumAmount += g.amountCZK.get()
        }
      }

      return sumAmount
    })

    @action
    initialize () {
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

      while (addDays(date, 7 * (counter - 1)) < accountingMonthEnd) {
        this.gumroad.push(new Gumroad(`${accountingMonthStart.getFullYear()}-${counter}G`, addDays(date, 7 * (counter - 1))))
        counter++
      }
    }

    @action.bound
    addInvoiceCZ () {
      this.invoicesCZ.push(new Invoice())
    }

    constructor () {
      this.gumroad = []
      this.fee = new Fee(this.gumroadSumCZK)
      this.peru = new Peru()
      this.invoicesCZ = []
    }
}

export default window.store = new Store()
