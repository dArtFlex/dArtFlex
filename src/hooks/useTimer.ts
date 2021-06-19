import { useState, useEffect } from 'react'
import moment from 'moment'

interface ITimerProps {
  endTime: number // timestamp in milliseconds
  timeInterval: number // milliseconds
}

const EXPIRED_TIMESTAMP: number = new Date().getTime()
const INTERVAL = 1000 * 60

const useTimer = (endTime: ITimerProps['endTime'], timeInterval: ITimerProps['timeInterval'] = INTERVAL) => {
  const duration = endTime > EXPIRED_TIMESTAMP ? endTime - timeInterval : 0
  const [time, setTime] = useState<number>(duration)

  useEffect(() => {
    if (time === 0) {
      return setTime(0)
    }
    const interval = setInterval(() => {
      setTime((time) => time - timeInterval)
    }, timeInterval)
    return () => clearInterval(interval)
  }, [])

  const days = Math.floor(moment.duration(time - EXPIRED_TIMESTAMP, 'milliseconds').asDays())
  const hours = Math.floor(moment.duration(time - EXPIRED_TIMESTAMP, 'milliseconds').asHours())
  const minutes = Math.floor(moment.duration(time - EXPIRED_TIMESTAMP, 'milliseconds').asMinutes() - hours * 60)

  const format = (value: number) => (value.toString().length > 1 ? value : `0${value}`)

  return {
    timer: `${format(days)}:${format(hours - 24 * days)}:${format(minutes - 60 * hours)}`,
  }
}

export default useTimer
