import { observable, action } from 'mobx'
import Invoice from './invoice.js'
import Fee from './fee.js'
import Gumroad from './gumroad.js'
import fileSaver from 'filesaver.js-npm'

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
          peru: this.peru.toJS(),
          invoicesCZ: this.invoicesCZ.map(i => i.toJS()),
          invoicesUS: this.invoicesUS.map(i => i.toJS()),
          invoicesEU: this.invoicesEU.map(i => i.toJS())
        })
      })

      const blob = await res.blob()
      fileSaver.saveAs(blob, 'taxes.zip')

      alert('Done')
    }

    constructor () {
      this.gumroad = Gumroad()
      this.fee = Fee(() => this.gumroad.incomes)
      this.peru = Invoice()
      this.invoicesUS = [this.peru]

      const invoiceForPreviousFee = new Invoice()
      invoiceForPreviousFee.dic = 'CZ8501274529'
      this.invoicesCZ = [invoiceForPreviousFee]
      this.invoicesEU = []
    }
}

export default window.store = new Store()
