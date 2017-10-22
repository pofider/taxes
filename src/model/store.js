import { observable, extendObservable, action, computed } from 'mobx'
import { addDays } from '../utils.js'
import Invoice from './invoice.js'
import Fee from './fee.js'
import Gumroad from './gumroad.js'

export class Store {
    @observable gumroad
    @observable fee
    @observable peru
    @observable invoicesCZ

    @action.bound
    addInvoiceCZ () {
      this.invoicesCZ.push(Invoice())
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
            date: this.fee.date
          },
          peru: {
            amount: this.peru.amount,
            amountCZK: this.peru.amountCZK,
            date: this.peru.date
          },
          invoicesCZ: this.invoicesCZ.toJS(),
          invoicesThird: this.incoicesThird.toJS(),
          invoicesEU: this.incoicesEU.toJS()
        })
      })

      alert((await res.text()))
    }

    constructor () {
      this.gumroad = Gumroad()
      this.fee = Fee(() => this.gumroad.incomes)
      this.peru = Invoice()
      this.invoicesCZ = []
    }
}

export default window.store = new Store()
