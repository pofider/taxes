import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ invoices, add }) => <div>
  <h2>Invoices from EU, with VAT 0%</h2>
  {invoices.map((i) =>
    <div>
      <label>Date</label>
      <input type='text' style={{color: 'red'}} value={i.dateStr} onChange={(ev) => i.updateDate(ev.target.value)} />
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
