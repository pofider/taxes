import { observable, action, toJS } from 'mobx'
import Invoice from './invoice.js'
import Fee from './fee.js'
import Gumroad from './gumroad.js'

export class Store {
    @observable gumroad
    @observable fee
    @observable peru
    @observable invoicesCZ
    @observable invoicesEU
    @observable invoicesUS

    @action.bound
    addInvoiceCZ () {
      this.invoicesCZ.push(Invoice())
    }

    @action.bound
    addInvoiceEU () {
      this.invoicesEU.push(Invoice())
    }

    @action.bound
    addInvoiceUS () {
      this.invoicesUS.push(Invoice())
    }

    @action.bound
    async createTaxes () {
      const res = await fetch('api/taxes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gumroad: this.gumroad.toJS(),
          fee: this.fee.toJS(),
          peru: toJS(this.peru),
          invoicesCZ: this.invoicesCZ.toJS(),
          invoicesUS: this.invoicesUS.toJS(),
          invoicesEU: this.invoicesEU.toJS()
        })
      })

      alert((await res.text()))
    }

    constructor () {
      this.gumroad = Gumroad()
      this.fee = Fee(() => this.gumroad.incomes)
      this.peru = Invoice()
      this.invoicesUS = []
      this.invoicesCZ = []
      this.invoicesEU = []
    }
}

export default window.store = new Store()
