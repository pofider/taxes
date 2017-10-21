import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ item }) => <div>
  <label>Id</label>
  <input type='text' placeholder='2017-9G' value={item.id} onChange={(ev) => (item.id = ev.target.value)} />
  <label>Date</label>
  <input type='text' placeholder='13.11.2017' value={item.date.toLocaleDateString('cz')} onChange={(ev) => (item.date = ev.target.value)} />
  <label>Amount CZK</label>
  <input type='text' placeholder='...' value={item.amountCZK.get()} />
  <label style={{color: 'red'}}>Amount</label>
  <input type='text' placeholder='1000.23' value={item.amount} onChange={(ev) => (item.amount = ev.target.value)} />
</div>)
