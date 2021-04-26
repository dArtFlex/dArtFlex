import React, { useState, useEffect } from 'react'
import moment from 'moment'

type ITimerProps = number // timestamp in milliseconds

const useTimer = (endTime: ITimerProps) => {
  const currTime = new Date()
  // @ts-ignore: Date calculation
  const diffTime = new Date(endTime) - currTime

  const duration = moment.duration(diffTime, 'milliseconds')
  const timeInterval = 1000

  const [time, setTime] = useState(duration)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => moment.duration(time.asMilliseconds() - timeInterval, 'milliseconds'))
    }, timeInterval)
    return () => clearInterval(interval)
  }, [])

  return {
    timer: moment(time.asMilliseconds()).format('HH:mm:ss'),
  }
}

export default useTimer
