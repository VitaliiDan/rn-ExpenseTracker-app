export const dateFormat = (date) => `${date.getFullYear()}-${numberFormat(date.getMonth()+1)}-${numberFormat(date.getDate())}`

const numberFormat = (number) => number < 10 && number > 0 ? `0${number}` : number