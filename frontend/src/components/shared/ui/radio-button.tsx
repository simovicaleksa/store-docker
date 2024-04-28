import React, { type HTMLAttributes } from "react"
import { FormControl, FormItem, FormLabel } from "./form"
import { RadioGroupItem } from "./radio-group"
import { buttonVariants } from "./button"
import { cn } from "@/lib/utils"

interface RadioButtonProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

export function RadioButton({
  className,
  value,
  children,
  ...rest
}: RadioButtonProps) {
  return (
    <FormItem
      className={buttonVariants({
        variant: "outline",
        className: "flex h-fit w-full max-w-none justify-start px-0 py-0",
      })}
      {...rest}
    >
      <FormLabel
        className={cn("flex w-full items-center gap-2 p-5", className)}
      >
        <FormControl>
          <RadioGroupItem value={value} />
        </FormControl>
        <div className="flex w-full flex-row items-center justify-between">
          {children}
        </div>
      </FormLabel>
    </FormItem>
  )
}

export function RadioButtonTitle({
  className,
  children,
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("", className)}>{children}</span>
}

export function RadioButtonInfo({
  className,
  children,
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-muted-foreground text-sm", className)}>
      {children}
    </span>
  )
}
