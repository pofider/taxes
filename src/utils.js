export function addDays (d, x) {
  const dat = new Date(d)
  dat.setDate(dat.getDate() + x)
  return dat
}
