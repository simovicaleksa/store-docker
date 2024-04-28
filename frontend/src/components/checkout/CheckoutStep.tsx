"use client"

import React, { type ReactNode, use } from "react"
import { Button } from "../shared/ui/button"
import { CheckoutContext } from "@/context/checkout/CheckoutContext"

export type StepType =
  | "shipping"
  | "delivery"
  | "payment"
  | "review"
  | "complete"

type CheckoutStepProps = {
  stepName: StepType
  form: ReactNode
  preview: ReactNode
}

export default function CheckoutStep({
  stepName,
  form,
  preview,
}: CheckoutStepProps) {
  const { currentStep, setCurrentStep, completedSteps } = use(CheckoutContext)
  const isCurrentlyActive = currentStep === stepName
  const isCompleted = completedSteps.includes(stepName)
  const handleEdit = () => setCurrentStep(stepName)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold capitalize">{stepName}</h1>
        <Button
          onClick={handleEdit}
          variant={"link"}
          disabled={isCurrentlyActive || !isCompleted}
        >
          Edit
        </Button>
      </div>
      {isCurrentlyActive ? form : preview}
    </div>
  )
}
