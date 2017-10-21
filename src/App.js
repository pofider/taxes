import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import GumroadInvoices from './GumroadInvoices.js'
import Fee from './Fee.js'
import Peru from './Peru.js'
import InvoicesCZ from './InvoicesCZ.js'
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
        <GumroadInvoices gumroad={this.props.store.gumroad} gumroadSumCZK={this.props.store.gumroadSumCZK} />
        <Fee fee={this.props.store.fee} />
        <Peru peru={this.props.store.peru} />
        <InvoicesCZ invoices={this.props.store.invoicesCZ} add={this.props.store.addInvoiceCZ} />
        <div>
          !!!<button onClick={this.props.store.createTaxes}>Create taxes input</button>!!!
        </div>
      </div>
    )
  }
}

export default App
