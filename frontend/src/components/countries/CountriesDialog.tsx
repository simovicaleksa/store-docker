"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shared/ui/form"

import React from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../shared/ui/alert-dialog"
import useCountriesDialog from "@/hooks/countries/useCountriesDialog"
import CountrySelect from "./CountrySelect"
import LoadingButton from "../shared/ui/loading-button"
import useAsyncLoader from "@/hooks/shared/useAsyncLoader"
import useCountries from "@/hooks/countries/useCountries"
import { updateRegion } from "@/actions/region"
import { useCurrentPath } from "@/hooks/shared/useCurrentPath"
import useCountry from "@/hooks/countries/useCountry"

const formSchema = z.object({
  country_code: z.string(),
})

export default function CountriesDialog() {
  const { open, setOpen } = useCountriesDialog()
  const { isLoading, asyncLoader } = useAsyncLoader()
  const { countries } = useCountries()
  const { currentPath } = useCurrentPath()
  const { countryCode } = useCountry()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country_code: countryCode || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    asyncLoader(async () => {
      await updateRegion(values.country_code, currentPath)
      setOpen(false)
    }).catch((e) => console.log(e))
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="space-y-0">
          <AlertDialogTitle>Select your country</AlertDialogTitle>
          <AlertDialogDescription>
            Select your country for more accurate prices and shipping.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="country_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <CountrySelect
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    countries={countries}
                  />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <LoadingButton isLoading={isLoading} type="submit">
                Change
              </LoadingButton>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
