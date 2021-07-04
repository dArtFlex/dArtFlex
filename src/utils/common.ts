import { FORMATS } from 'constant'

export const acceptFileTypes = (fileExt: string) =>
  FORMATS[Object.keys(FORMATS).find((type) => FORMATS[type].includes(fileExt)) || '']

export function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate()
}

export function getIdFromString(v: string): number | null {
  const getId = v.match(/\d/g)
  return getId ? Number(getId.join('')) : null
}

export function normalizeDate(date: string): Date {
  const dateInst = new Date(date)
  return dateInst.getTime() ? new Date(Number(date)) : new Date(date)
}
