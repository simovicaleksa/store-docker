import React from "react"
import { Button, ButtonProps } from "./button"
import { Loader } from "lucide-react"

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean
}

export default function LoadingButton({
  isLoading,
  children,
  disabled,
  ...rest
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading || disabled} {...rest}>
      {isLoading && <Loader className="mr-2 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
