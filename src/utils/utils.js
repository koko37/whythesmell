export function getFirstDayOfWeek(cDate) {
  let cDateTemp = new Date(cDate)
  cDateTemp.setHours(0,0,0,0)
  let cd = cDateTemp.getDate() - cDateTemp.getDay()
  return new Date(cDateTemp.setDate(cd + 1))
}

export function getEndDayOfWeek(cDate) {
  let cDateTemp = new Date(cDate)
  cDateTemp.setHours(23,59,59,999)
  let cd = cDateTemp.getDate() - cDateTemp.getDay()
  return new Date(cDateTemp.setDate(cd + 7))
}

export function getStartOfDay(cDate) {
  let cDateTemp = new Date(cDate)
  cDateTemp.setHours(0,0,0,0)
  return cDateTemp
}

export function getEndOfDay(cDate) {
  let cDateTemp = new Date(cDate)
  cDateTemp.setHours(23,59,59,999)
  return cDateTemp
}

export function getWeekDayTwo(cDate) {
  let day = cDate.toLocaleString('default', {weekday: 'long'})
  return day.substring(0, 2)
}
