import moment from 'moment/min/moment-with-locales'

export const dateFormat = (date:Date) => {
  return moment(date).locale('th').format('LL')
}