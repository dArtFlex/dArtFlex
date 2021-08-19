import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    fullname: yup
      .string()
      .max(32)
      .matches(/^[A-Za-z0-9\s]+$/, 'Use latin alphabet'),
    userid: yup
      .string()
      .max(42)
      .required('Username is required')
      .matches(/^[A-Za-z0-9\s_]+$/, 'Use latin alphabet'),
    overview: yup
      .string()
      .max(200)
      .matches(/^[A-Za-z0-9\s]+$/, 'Use latin alphabet'),
    website: yup
      .string()
      .matches(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, 'Invalid url'),
    other_url: yup
      .string()
      .matches(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/, 'Invalid url'),
    discord: yup.number().typeError('Please provide discord code'),
  })
}

export function validateTwitter(value: string) {
  let error
  if (value.startsWith('https://')) {
    error = 'Invalid twitter username'
  }
  if (value.startsWith('twitter.com')) {
    error = 'Invalid twitter username'
  }
  if (value.startsWith('@')) {
    error = 'Provide twitter username without "@"'
  }
  if (!value.length) {
    error = ''
  }
  return error
}

export function validateInstagram(value: string) {
  let error
  if (value.startsWith('https://')) {
    error = 'Invalid instagram username'
  }
  if (value.startsWith('instagram.com')) {
    error = 'Invalid instagram username'
  }
  if (value.startsWith('@')) {
    error = 'Provide instagram username without "@"'
  }
  if (!value.length) {
    error = ''
  }
  return error
}

export function validateFacebook(value: string) {
  let error
  if (value.startsWith('https://')) {
    error = 'Invalid facebook username'
  }
  if (value.startsWith('facebook.com')) {
    error = 'Invalid facebook username'
  }
  if (!value.length) {
    error = ''
  }
  return error
}

export function validateYouTube(value: string) {
  let error
  if (!value.startsWith('https://www.youtube.com/channel/')) {
    error = 'Provide full youtube channel link'
  }
  if (!value.length) {
    error = ''
  }
  return error
}

export function validateTikTok(value: string) {
  let error
  if (value.startsWith('https://')) {
    error = 'Invalid tiktok username'
  }
  if (value.startsWith('tiktok.com')) {
    error = 'Invalid tiktok username'
  }
  if (value.startsWith('@')) {
    error = 'Provide tiktok username without "@"'
  }
  if (!value.length) {
    error = ''
  }
  return error
}
