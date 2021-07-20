import { useState, useEffect } from 'react'

interface ITimerProps {
  endTime: number // timestamp in milliseconds
  timeInterval: number // milliseconds
}

const INTERVAL = 1000

const useTimer = (endTime: ITimerProps['endTime'], timeInterval: ITimerProps['timeInterval'] = INTERVAL) => {
  const [time, setTime] = useState<number>(endTime)

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = endTime - new Date().getTime()
      if (duration <= 0) {
        clearInterval(interval)
      } else {
        setTime((time) => time - timeInterval)
      }
    }, timeInterval)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const timeBetweenDates = () => {
    const difference = time - new Date().getTime()
    if (difference <= 0) {
      return {
        timer: `${0}d:${0}h:${0}m`,
        days: 0,
        hours: 0,
        minutes: 0,
      }
    }
    let seconds = Math.floor(difference / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    hours %= 24
    minutes %= 60
    seconds %= 60

    return {
      timer: `${days}d:${hours}h:${minutes}m`,
      days,
      hours,
      minutes,
    }
  }

  return {
    timer: timeBetweenDates().timer,
    days: timeBetweenDates().days,
    hours: timeBetweenDates().hours,
    minutes: timeBetweenDates().minutes,
  }
}

export default useTimer
