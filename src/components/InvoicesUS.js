import React from 'react'
import { observer } from 'mobx-react'
import { formatCZDate } from '../utils'

export default observer(({ invoices, add }) => <div>
  <h2>Invoices from US</h2>
  {<div>
    <label>Date</label>
    <input disabled type='text' value={formatCZDate(invoices[0].date)} />
    <label>CZK</label>
    <input disabled type='text' value={invoices[0].amountCZK} />
    <label>USD</label>
    <input disabled type='text' value={invoices[0].amountUSD} />
  </div>}
  {invoices.slice(1).map((i) =>
    <div>
      <label style={{color: 'red'}}>Date</label>
      <input type='text' style={{color: 'red'}} onChange={(ev) => i.updateDate(ev.target.value)} />
      <label>CZK</label>
      <input disabled type='text' value={i.amountCZK} />
      <label>USD</label>
      <input type='text' style={{color: 'red'}} onChange={(ev) => i.updateAmountUSD(ev.target.value)} />
      <label>EUR</label>
      <input type='text' style={{color: 'red'}} onChange={(ev) => i.updateAmountEUR(ev.target.value)} />
    </div>
  )}
  <button onClick={add}>Add invoice</button>

</div>)
