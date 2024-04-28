"use client"

import { CheckoutProvider } from "@/context/checkout/CheckoutContext"
import React, { type ReactNode, useState } from "react"
import { type StepType } from "./CheckoutStep"

export default function CheckoutController({
  children,
}: {
  children: ReactNode
}) {
  const [completedSteps, setCompletedSteps] = useState<StepType[]>([])
  const [currentStep, setCurrentStep] = useState<StepType>("shipping")

  return (
    <CheckoutProvider
      value={{ currentStep, setCurrentStep, completedSteps, setCompletedSteps }}
    >
      {children}
    </CheckoutProvider>
  )
}
