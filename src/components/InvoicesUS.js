import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ invoices, add }) => <div>
  <h2>Invoices from US, no VAT</h2>
  {<div>
    <label>Date</label>
    <input disabled type='text' value={invoices[0].dateStr} />
    <label>USD</label>
    <input disabled type='text' value={invoices[0].amountStrUSD} />
  </div>}
  {invoices.slice(1).map((i) =>
    <div>
      <label>Date</label>
      <input type='text' style={{color: 'red'}} value={i.dateStr} onChange={(ev) => i.updateDate(ev.target.value)} />
      <label>CZK</label>
      <input disabled type='text' value={i.amountCZK} />
      <label>USD</label>
      <input type='text' style={{color: 'red'}} value={i.amountStrUSD} onChange={(ev) => i.updateAmountUSD(ev.target.value)} />
      <label>EUR</label>
      <input type='text' style={{color: 'red'}} value={i.amountStrEUR} onChange={(ev) => i.updateAmountEUR(ev.target.value)} />
    </div>
  )}
  <button onClick={add}>Add invoice</button>

</div>)
