"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/ui/form"
import { Input } from "@/components/shared/ui/input"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import LoadingButton from "../shared/ui/loading-button"
import { retrieveOrder } from "@/services/order"
import { useRouter } from "next/navigation"
import useCountry from "@/hooks/countries/useCountry"
import { toast } from "../shared/ui/use-toast"
import { SearchIcon } from "lucide-react"

const FormSchema = z.object({
  order_id: z.string().startsWith("order_", {
    message: "Order id must start with 'order_'.",
  }),
})

export default function TrackForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { countryCode } = useCountry()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order_id: "",
    },
  })

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    const order = await retrieveOrder(values.order_id).catch((e) =>
      console.log(e),
    )

    if (order?.id)
      return router.push(`/${countryCode}/order/track/${values.order_id}`)

    toast({
      title: "That order does not exist!",
      description:
        "An order with that id does not exist. Contact customer support.",
      variant: "destructive",
    })

    setIsLoading(false)
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted-foreground/10 shadow-lg">
      <SearchIcon className="pointer-events-none absolute bottom-10 right-12 size-64 text-muted-foreground opacity-5 lg:bottom-5 lg:right-32 lg:size-80" />

      <CardHeader className="relative z-10 mt-5 items-center text-center">
        <CardTitle className="text-4xl font-bold">Track Your Order</CardTitle>
        <CardDescription>
          Enter your order id to check the status of your order.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 mx-auto max-w-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center space-y-6"
          >
            <FormField
              control={form.control}
              name="order_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="order_ABC" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can find your order ID in your order confirmation email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton isLoading={isLoading} type="submit">
              Track Order
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
