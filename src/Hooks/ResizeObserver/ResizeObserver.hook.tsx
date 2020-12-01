import { RefObject, useCallback, useEffect } from 'react'
import polyfill from 'resize-observer-polyfill'

const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  callback?: (entry: Partial<DOMRectReadOnly>) => void
) => {
  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0]
    if(callback) {
      callback(entry.contentRect)
    }
  }, [callback])

  useEffect(() => {

    if(!ref.current) {
      return
    }

    let resizeObserver = new (globalThis.ResizeObserver || polyfill)(handleResize)
    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  }, [ref])
}

export default useResizeObserver