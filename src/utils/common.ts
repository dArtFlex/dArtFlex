import moment from 'moment'
import { FORMATS } from 'config/consts'

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

export function tabelTimeFormat(date: string, utc?: boolean) {
  const _utc = utc || false
  return `${moment(date).utc(false).format('DD MMMM YYYY')} at ${moment(date).utc(_utc).format('hh:mm')}`
}

export function creatArrayFromNumber(n = 10): number[] {
  const emptyArray = new Array(n)
  const array = []
  for (let i = 0; i < emptyArray.length; i++) {
    array.push(i)
  }
  return array
}

export function shortCutName(account?: string) {
  if (account && account?.length < 20) {
    return account
  }
  return `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}`
}

export function validatePrice(value: string | number) {
  let error
  if (typeof value === 'string' && !value.length) {
    error = 'Required'
  } else if (value <= 0) {
    error = 'Price bid should be more then 0'
  } else if (!/^\d+(\.\d+)?$/.test(`${value}`)) {
    error = 'Incorrect number format'
  }
  return error
}

export async function handleDownload(imageUrl: string) {
  const data = await fetch(imageUrl)
  const blob = await data.blob()
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `image.${blob.type.split('/')[1]}`)
  document.body.appendChild(link)
  link.click()
}

export async function imageUrlToFile(imageUrl: string) {
  const data = await fetch(imageUrl)
  const blob = await data.blob()
  const file = new File([blob], `image.${blob.type.split('/')[1]}`, { type: blob.type })
  return file
}
