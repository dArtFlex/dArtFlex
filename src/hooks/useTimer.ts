import { useState, useEffect } from 'react'

interface ITimerProps {
  endTime: number // timestamp in milliseconds
  timeInterval: number // milliseconds
}

interface ITime {
  timer: string
  days: number
  hours: number
  minutes: number
  seconds: number
}

const INTERVAL = 1000

const useTimer = (endTime: ITimerProps['endTime'], timeInterval: ITimerProps['timeInterval'] = INTERVAL) => {
  const [time, setTime] = useState<ITime>({ timer: `${0}d:${0}h:${0}m`, days: 0, hours: 0, minutes: 0, seconds: 0 })

  const timeBetweenDates = () => {
    const difference = endTime - new Date().getTime()
    let seconds = Math.floor(difference / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    hours %= 24
    minutes %= 60
    seconds %= 60

    const timer =
      endTime > new Date().getTime() + 1000 * 60 * 60
        ? `${days}d:${hours}h:${minutes}m`
        : `${hours}h:${minutes}m:${seconds}s`

    setTime({
      timer,
      days,
      hours,
      minutes,
      seconds,
    })
  }

  useEffect(() => {
    const difference = endTime - new Date().getTime()

    timeBetweenDates()
    const iId = setInterval(() => {
      if (difference <= 0) {
        clearInterval(iId)
        return
      }
      timeBetweenDates()
    }, timeInterval)

    return () => {
      clearInterval(iId)
    }
  }, [endTime])

  return time
}

export default useTimer
