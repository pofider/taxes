export function addDays (d, x) {
  const dat = new Date(d)
  dat.setDate(dat.getDate() + x)
  return dat
}

export function formatCZDate (date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
