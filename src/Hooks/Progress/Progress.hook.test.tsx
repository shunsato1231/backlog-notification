import React from 'react'
import ReactDOM from 'react-dom'
import { renderHook, act } from '@testing-library/react-hooks';
import { useProgress, StepObjType, StepNumType } from './Progress.hook';
import { ProgressProvider } from './Progress.context';

describe('[CUSTOM HOOK] useProgress', () => {
  it('provider renders without crashing', () => {
    const initialProgressList: StepObjType[] = [
      {
        name: 'step1',
        status: 'pending'
      },
      {
        name: 'step2',
        status: 'pending'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ]
    const initialStep: StepNumType = 'allPending'

    const div = document.createElement('div')
    ReactDOM.render(<ProgressProvider
      list={initialProgressList}
      step={initialStep}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should increment step', () => {
    const initialProgress: StepObjType[] = [
      {
        name: 'step1',
        status: 'pending'
      },
      {
        name: 'step2',
        status: 'pending'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ]

    const { result } = renderHook(() => useProgress(initialProgress, 'allPending'))

    act(() => result.current.Next())
    expect(result.current.currentStep).toEqual(1)
    expect(result.current.direction).toEqual('next')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'current'
      },
      {
        name: 'step2',
        status: 'pending'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ])

    act(() => result.current.Next())
    expect(result.current.currentStep).toEqual(2)
    expect(result.current.direction).toEqual('next')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'done'
      },
      {
        name: 'step2',
        status: 'current'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ])

    act(() => result.current.Next())
    expect(result.current.currentStep).toEqual(3)
    expect(result.current.direction).toEqual('next')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'done'
      },
      {
        name: 'step2',
        status: 'done'
      },
      {
        name: 'step3',
        status: 'current'
      }
    ])

    act(() => result.current.Next())
    expect(result.current.currentStep).toEqual('finish')
    expect(result.current.direction).toEqual('next')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'done'
      },
      {
        name: 'step2',
        status: 'done'
      },
      {
        name: 'step3',
        status: 'done'
      }
    ])

    act(() => result.current.Next())
    expect(result.current.currentStep).toEqual('finish')
    expect(result.current.direction).toEqual('next')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'done'
      },
      {
        name: 'step2',
        status: 'done'
      },
      {
        name: 'step3',
        status: 'done'
      }
    ])
  })

  it('should decrement step', () => {
    const initialProgress: StepObjType[] = [
      {
        name: 'step1',
        status: 'done'
      },
      {
        name: 'step2',
        status: 'done'
      },
      {
        name: 'step3',
        status: 'done'
      }
    ]

    const { result } = renderHook(() => useProgress(initialProgress, 'finish'))

    act(() => result.current.Prev())
    expect(result.current.currentStep).toEqual(3)
    expect(result.current.direction).toEqual('prev')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'done'
      },
      {
        name: 'step2',
        status: 'done'
      },
      {
        name: 'step3',
        status: 'current'
      }
    ])

    act(() => result.current.Prev())
    expect(result.current.currentStep).toEqual(2)
    expect(result.current.direction).toEqual('prev')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'done'
      },
      {
        name: 'step2',
        status: 'current'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ])

    act(() => result.current.Prev())
    expect(result.current.currentStep).toEqual(1)
    expect(result.current.direction).toEqual('prev')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'current'
      },
      {
        name: 'step2',
        status: 'pending'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ])

    act(() => result.current.Prev())
    expect(result.current.currentStep).toEqual('allPending')
    expect(result.current.direction).toEqual('prev')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'pending'
      },
      {
        name: 'step2',
        status: 'pending'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ])

    act(() => result.current.Prev())
    expect(result.current.currentStep).toEqual('allPending')
    expect(result.current.direction).toEqual('prev')
    expect(result.current.progressList).toEqual([
      {
        name: 'step1',
        status: 'pending'
      },
      {
        name: 'step2',
        status: 'pending'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ])
  })

  it('should change currentStep when chnaged hash', ()=> {
    const initialProgress: StepObjType[] = [
      {
        name: 'step1',
        status: 'pending'
      },
      {
        name: 'step2',
        status: 'pending'
      }
    ]
    

    const { result } = renderHook(() => useProgress(initialProgress, 'allPending'))

    window.location.hash = 'step1'
    act(() => {result.current.hashChange()})
    expect(result.current.currentStep).toBe(1)

    window.location.hash = 'step2'
    act(() => {result.current.hashChange()})
    expect(result.current.currentStep).toBe(2)

    window.location.hash = 'step3'
    act(() => {result.current.hashChange()})
    expect(result.current.currentStep).toBe('finish')

    window.location.hash = ''
    act(() => {result.current.hashChange()})
    expect(result.current.currentStep).toBe('allPending')

    window.location.hash = 'finish'
    act(() => {result.current.hashChange()})
    expect(result.current.currentStep).toBe('finish')
  })
})