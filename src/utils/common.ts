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
  const isTimestamp = new Date(date).getTime() > 0
  return isTimestamp ? new Date(date) : new Date(Number(date))
}
