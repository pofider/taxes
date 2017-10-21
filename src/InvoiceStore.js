import { observable, action, computed, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { addDays, formatCZDate } from './utils.js'
import conversion from './conversion.js'

class Gumroad {
    @observable id
    @observable amountStr
    @observable date
    @observable amountCZK

    @computed get amount () {
      try {
        return parseFloat(this.amountStr)
      } catch (e) {
        return 0
      }
    }

    @action.bound
    updateAmount (amount) {
      this.amountStr = amount
      this.amountCZK = 100

      conversion(this)
    }

    constructor (id, date) {
      this.id = id
      this.date = date
    }
}

class Fee {
  @observable date

  @computed get amountCZK () {
    return Math.round(this.gumroadSumCZK() * 0.23)
  }

  constructor (gumroadSumCZK) {
    this.date = new Date()
    this.gumroadSumCZK = gumroadSumCZK
  }
}

class Peru {
  @observable dateStr
  @observable amountCZK
  @observable amountStr

  @computed get date () {
    try {
      return new Date(this.dateStr)
    } catch (e) {
      return new Date()
    }
  }

  @computed get amount () {
    try {
      return parseFloat(this.amountStr)
    } catch (e) {
      return 0
    }
  }

  @action.bound
  async updateAmount (amount) {
    this.amountStr = amount

    conversion(this)
  }

  @action.bound
  async updateDate (date) {
    this.dateStr = date

    conversion(this)
  }

  constructor () {
    this.dateStr = formatCZDate(new Date())
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

    @computed get gumroadSumCZK () {
      let sumAmount = 0
      for (let g of this.gumroad) {
        if (g.amountCZK) {
          sumAmount += g.amountCZK
        }
      }

      return sumAmount
    }

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

     @action.bound
    async createTaxes () {
      const res = await fetch('api/taxes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gumroad: this.gumroad.map((g) => ({
            id: g.id,
            amount: g.amount,
            amountCZK: g.amountCZK,
            date: g.date
          })),
          fee: {
            amount: this.fee.amount,
            amountCZK: this.fee.amountCZK,
            date: this.fee.date,
            dateStr: this.fee.dateStr
          },
          invoicesCZ: this.invoicesCZ.toJS()
        })
      })

      alert((await res.text()))
    }

     constructor () {
       this.gumroad = []
       this.fee = new Fee(() => this.gumroadSumCZK)
       this.peru = new Peru()
       this.invoicesCZ = []
     }
}

export default window.store = new Store()
