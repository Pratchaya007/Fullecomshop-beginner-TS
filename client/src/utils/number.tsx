import mumeral from 'numeral';

export const numberFormat = (num:number) => {
  return mumeral(num).format('0,0')
}