import { StepType } from "@/components/checkout/CheckoutStep"
import { Dispatch, ReactNode, SetStateAction, createContext } from "react"

type CheckoutContextType = {
  currentStep: StepType
  setCurrentStep: Dispatch<SetStateAction<StepType>>
  completedSteps: StepType[]
  setCompletedSteps: Dispatch<SetStateAction<StepType[]>>
}

export const CheckoutContext = createContext<CheckoutContextType>({
  currentStep: "shipping",
  setCurrentStep: () => {},
  completedSteps: [],
  setCompletedSteps: () => {},
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
