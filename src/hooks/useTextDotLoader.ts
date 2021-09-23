import { useState, useEffect } from 'react'

interface ITextDotLoader {
  text: string
  timeInterval?: number
}

export default function useTextDotLoader({ text, timeInterval = 500 }: ITextDotLoader) {
  const [dot, setDot] = useState('')

  const handlerLoading = () => {
    setDot((state) => (state === '' ? '.' : state === '.' ? '..' : ''))
  }

  useEffect(() => {
    const iId = setInterval(() => {
      handlerLoading()
    }, timeInterval)
    return () => {
      clearInterval(iId)
    }
  }, [text])

  return { textLoader: text + dot }
}
