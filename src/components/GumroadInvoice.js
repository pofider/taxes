import React from 'react'
import { observer } from 'mobx-react'
import { formatCZDate } from '../utils'

export default observer(({ item }) => <div>
  <label>Id</label>
  <input disabled type='text' value={item.id} onChange={(ev) => (item.id = ev.target.value)} />
  <label>Date</label>
  <input disabled type='text' value={formatCZDate(item.date)} />
  <label>CZK</label>
  <input disabled type='text' placeholder='...' value={item.amountCZK} />
  <label style={{color: 'red'}}>USD</label>
  <input type='text' onChange={(ev) => (item.updateAmountUSD(ev.target.value))} />
</div>)
