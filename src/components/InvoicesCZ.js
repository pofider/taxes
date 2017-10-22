import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ invoices, add }) => <div>
  <h2>Invoices from CZ, with VAT 21</h2>
  <button onClick={add}>Add invoice</button>
  {invoices.map((i) =>
    <div>
      <label>Date</label>
      <input type='text' style={{color: 'red'}} value={i.dateStr} onChange={(ev) => i.updateDate(ev.target.value)} />
      <label>CZK</label>
      <input type='text' style={{color: 'red'}} value={i.amountStrCZ} onChange={(ev) => i.updateAmountCZK(ev.target.value)} />
    </div>
  )}

</div>)
