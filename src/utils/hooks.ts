import { useEffect, useState } from 'react'

export const useTimer = (delay?: number): Date => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), delay || 1000)
    return () => clearInterval(timer)
  }, [delay])

  return time
}
