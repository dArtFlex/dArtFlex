import { FORMATS } from 'constant'

export const acceptFileTypes = (fileExt: string) =>
  FORMATS[Object.keys(FORMATS).find((type) => FORMATS[type].includes(fileExt)) || '']

export function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate()
}
