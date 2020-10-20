export function getFirstDayOfWeek(cDate) {
  let cDateTemp = new Date(cDate)
  let cd = cDateTemp.getDate() - cDateTemp.getDay()
  return new Date(cDateTemp.setDate(cd + 1))
}

export function getEndDayOfWeek(cDate) {
  let cDateTemp = new Date(cDate)
  let cd = cDateTemp.getDate() - cDateTemp.getDay()
  return new Date(cDateTemp.setDate(cd + 7))
}
