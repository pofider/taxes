import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import GumroadInvoices from './components/GumroadInvoices.js'
import Fee from './components/Fee.js'
import Peru from './components/Peru.js'
import InvoicesCZ from './components/InvoicesCZ.js'
import InvoicesEU from './components/InvoicesEU.js'
import InvoicesUS from './components/InvoicesUS.js'
import { observer, inject } from 'mobx-react'

@inject('store') @observer
class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Taxes generator</h1>
        </header>
        <GumroadInvoices gumroad={this.props.store.gumroad} />
        <Fee fee={this.props.store.fee} />
        <Peru peru={this.props.store.peru} />
        <InvoicesCZ invoices={this.props.store.invoicesCZ} add={this.props.store.addInvoiceCZ} />
        <InvoicesUS invoices={this.props.store.invoicesUS} add={this.props.store.addInvoiceUS} />
        <InvoicesEU invoices={this.props.store.invoicesEU} add={this.props.store.addInvoiceEU} />
        <div>
          !!!<button onClick={this.props.store.createTaxes}>Create taxes input</button>!!!
        </div>
      </div>
    )
  }
}

export default App
