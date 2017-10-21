import React from 'react'
import { observer } from 'mobx-react'
import { formatCZDate } from './utils.js'

export default observer(({ item }) => <div>
  <label>Id</label>
  <input disabled type='text' value={item.id} onChange={(ev) => (item.id = ev.target.value)} />
  <label>Date</label>
  <input disabled type='text' value={formatCZDate(item.date)} />
  <label>CZK</label>
  <input disabled type='text' placeholder='...' value={item.amountCZK} />
  <label style={{color: 'red'}}>USD</label>
  <input type='text' value={item.amountStr} onChange={(ev) => (item.updateAmount(ev.target.value))} />
</div>)