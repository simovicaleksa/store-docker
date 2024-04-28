import type { StepType } from "@/components/checkout/CheckoutStep"
import type { Dispatch, ReactNode, SetStateAction } from "react"
import { createContext } from "react"

type CheckoutContextType = {
  currentStep: StepType
  setCurrentStep: Dispatch<SetStateAction<StepType>>
  completedSteps: StepType[]
  setCompletedSteps: Dispatch<SetStateAction<StepType[]>>
}

export const CheckoutContext = createContext<CheckoutContextType>({
  currentStep: "shipping",
  completedSteps: [],
  setCompletedSteps: () => {
    return
  },
  setCurrentStep: () => {
    return
  },
})

export function CheckoutProvider({
  value,
  children,
}: {
  value: CheckoutContextType
  children: ReactNode
}) {
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}
