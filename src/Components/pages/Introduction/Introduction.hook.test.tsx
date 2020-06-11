import { renderHook, act } from '@testing-library/react-hooks';
import { useProgress, StepObjType } from './Introduction.hook';

describe('[CUSTOM HOOK] useProgress', () => {
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
})