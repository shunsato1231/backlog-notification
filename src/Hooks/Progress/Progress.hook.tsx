import { useState, useEffect } from "react"

export type StepObjType = {
  name   : string,
  status : 'pending' | 'current' | 'done'
}

export type StepNumType   = number | 'finish' | 'allPending'
type DirectionType = 'prev' | 'next' 

export interface ProgressContextType {
  progressList    : StepObjType[]
  currentStep     : StepNumType,
  direction       : DirectionType,
  Next            : () => void,
  Prev            : () => void,
  SetNextProgress : (step: StepNumType) => void,
  hashChange: () => void
}

export const useProgress = (initialProgressList: StepObjType[], initialStep: StepNumType): ProgressContextType => {
  const [progressList, setProgressList] = useState<StepObjType[]>(initialProgressList)
  const [currentStep, setCurrentStep]   = useState<StepNumType>(initialStep)
  const [direction, setDirection]       = useState<DirectionType>('next')

  /**
   * hashに合わせてProgressを進める
   */
  const hashChange = (): void => {
    const hashToStepNum: StepNumType 
      = window.location.hash.includes('step')   ? Number(window.location.hash.replace(/[^0-9]/g, ''))
      : window.location.hash.includes('finish') ? 'finish'
      : 'allPending'

    if(currentStep !== hashToStepNum) {
      SetNextProgress(hashToStepNum)
    }
  }

  /**
   * ステップを1つ進める
   */
  const Next = (): void => {
    const nextStep = currentStep === 'finish'     ? 'finish'
                   : currentStep === "allPending" ? 1
                   : Number(currentStep) + 1

    SetNextProgress(nextStep)
  }

  /**
   * ステップを1つ戻す
   */
  const Prev = (): void => {
    const nextStep = currentStep === 'finish'     ? progressList.length
                   : currentStep === 'allPending' ? 'allPending'
                   : Number(currentStep) - 1

    SetNextProgress(nextStep)
  }

  /**
   * ステップが戻るのか、進むのかをチェックする
   * @param current {StepNumType}  変更前のステップ
   * @param next    {StepNumType}  これから変更するステップ
   */
  const checkDirection = (current: StepNumType, next: StepNumType): void => {

    const stepAllNum = (num: StepNumType): number => {
      const _num = num === 'finish'     ? Number(progressList.length + 1)
                 : num === 'allPending' ? Number(0)
                 : Number(num)

      return _num
    }
  
    const _current: number = stepAllNum(current)
    const _next: number = stepAllNum(next)

    if(_next < _current) {
      setDirection('prev')
    } else if(_current < _next) {
      setDirection('next')
    }
  }

  /**
   * 次に進むステップの数を入力して、progressList、direction、currentStepを更新する
   * @param nextStep {StepNumType}
   */
  const SetNextProgress = (nextStep: StepNumType): void => {
    // check direction
    checkDirection(currentStep, nextStep)

    // transform progressList
    const progressList_copy = progressList

    if(nextStep === 'finish' || nextStep > progressList.length) {
      progressList_copy.map(el => el.status = 'done')
      setProgressList(progressList_copy)
      setCurrentStep('finish')
      window.location.hash = 'finish'
    } else if(nextStep === 'allPending' || nextStep < 1) {
      progressList_copy.map(el => el.status = 'pending')
      setProgressList(progressList_copy)
      setCurrentStep('allPending')
      window.location.hash = ''
    } else {
      progressList_copy.map((el, index) => {
        if(index < nextStep -1) {
          return el.status = 'done'
        } else if(index === nextStep -1) {
          return el.status = 'current'
        } else {
          return el.status = 'pending'
        }
      })
      setProgressList(progressList_copy)
      setCurrentStep(nextStep)
      window.location.hash = 'step' + nextStep
    }
  }


  /**
   * ページ読み込み時とハッシュ変更時にhashChange関数発火
   * 
   */
  useEffect(() => {
    hashChange()
  
    window.onhashchange = () => {
      hashChange()
    }
  }) 

  return {
    progressList,
    currentStep,
    direction,
    Next,
    Prev,
    SetNextProgress,
    hashChange
  }
}

export default useProgress