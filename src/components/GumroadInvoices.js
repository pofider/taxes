import React from 'react'
import { observer } from 'mobx-react'
import GumroadInvoice from './GumroadInvoice'

export default observer(({ gumroad }) => (
  <div>
    <h2>Gumroad invoices</h2>
    <div>
      {gumroad.invoices.map((g) => <GumroadInvoice item={g} />)}
    </div>
    <div>
      <h4>Total incomes: {gumroad.incomes.toFixed()} CZK</h4>
    </div>
  </div>
))
