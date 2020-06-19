import { useState } from 'react'

interface InputContextType {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const useInput = (initialValue: string): InputContextType => {
  const [value, set] = useState(initialValue)
  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => set(event.target.value)
  }
}