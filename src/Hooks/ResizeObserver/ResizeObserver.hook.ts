import { RefObject, useCallback, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  callback?: (entry: DOMRectReadOnly) => void
) => {
  const handleResize = useCallback((entries) => {
    const entry = entries[0]
    if(callback) {
      callback(entry.contentRect)
    }
  }, [callback])

  useEffect(() => {
    if(!ref.current) {
      return
    }

    let resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  }, [ref])
}

export default useResizeObserver