"use client"

import useCountries from "@/hooks/countries/useCountries"
import React, { type ChangeEvent, type FormEvent, use, useState } from "react"
import { Input } from "../shared/ui/input"
import { Label } from "../shared/ui/label"
import Asterisk from "../shared/ui/asterisk"
import CountrySelect from "../countries/CountrySelect"
import useAsyncLoader from "@/hooks/shared/useAsyncLoader"
// import { retrieveCart } from "@/services/cart/actions"
import LoadingButton from "../shared/ui/loading-button"
import { setAddress } from "@/services/checkout/actions"
import { CheckoutContext } from "@/context/checkout/CheckoutContext"
import { type CartType } from "@/types/cart"
import { toast } from "../shared/ui/use-toast"

type ShippingFormData = {
  first_name: string
  last_name: string
  company?: string
  address_1: string
  address_2?: string
  city: string
  province?: string
  country_code: string
  postal_code: string
  email: string
  phone: string
}

export default function ShippingForm({ cart }: { cart: CartType | null }) {
  const { setCurrentStep, setCompletedSteps, completedSteps } =
    use(CheckoutContext)
  const { countries } = useCountries()
  const { isLoading, asyncLoader } = useAsyncLoader()
  const regionOnlyCountries = countries.filter(
    (country) => country.region_id === cart?.region_id,
  )

  const [data, setData] = useState<ShippingFormData>({
    first_name: cart?.shipping_address?.first_name ?? "",
    last_name: cart?.shipping_address?.last_name ?? "",
    company: cart?.shipping_address?.company ?? "",
    address_1: cart?.shipping_address?.address_1 ?? "",
    address_2: cart?.shipping_address?.address_2 ?? "",
    city: cart?.shipping_address?.city ?? "",
    province: cart?.shipping_address?.province ?? "",
    country_code: cart?.shipping_address?.country_code ?? "",
    email: cart?.email ?? "",
    postal_code: cart?.shipping_address?.postal_code ?? "",
    phone: cart?.shipping_address?.phone ?? "",
  })

  function handleDataChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.currentTarget

    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleCountryChange(e: string) {
    setData((prev) => ({ ...prev, country_code: e }))
  }

  // useEffect(() => {
  //   asyncLoader(async () => {
  //     const cart = await retrieveCart()
  //     setData({
  //       first_name: cart?.shipping_address?.first_name ?? "",
  //       last_name: cart?.shipping_address?.last_name ?? "",
  //       company: cart?.shipping_address?.company ?? "",
  //       address_1: cart?.shipping_address?.address_1 ?? "",
  //       address_2: cart?.shipping_address?.address_2 ?? "",
  //       city: cart?.shipping_address?.city ?? "",
  //       province: cart?.shipping_address?.province ?? "",
  //       country_code: cart?.shipping_address?.country_code ?? "",
  //       email: cart?.email ?? "",
  //       postal_code: cart?.shipping_address?.postal_code ?? "",
  //       phone: cart?.shipping_address?.phone ?? "",
  //     })
  //   })
  // }, [asyncLoader])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    asyncLoader(async () => {
      const error = await setAddress(data)

      if (error) {
        toast({
          title: "Setting address failed.",
          description:
            "Something went wrong. Contact customer support or try again later.",
          variant: "destructive",
        })
        return null
      }

      if (!completedSteps.includes("shipping")) {
        setCompletedSteps((prev) => [...prev, "shipping"])
      }
      setCurrentStep("delivery")
    }).catch((e) => console.log(e))
  }

  return (
    <form className="grid grid-cols-2 gap-3" onSubmit={(e) => onSubmit(e)}>
      <div className="space-y-1">
        <Label htmlFor="first_name">
          First name
          <Asterisk />
        </Label>
        <Input
          disabled={isLoading}
          id="first_name"
          name="first_name"
          placeholder="First name"
          value={data.first_name}
          onChange={(e) => handleDataChange(e)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="last_name">
          Last name
          <Asterisk />
        </Label>
        <Input
          disabled={isLoading}
          id="last_name"
          name="last_name"
          placeholder="Last name"
          value={data.last_name}
          onChange={(e) => handleDataChange(e)}
          required
        />
      </div>
      <div className="col-span-full space-y-1">
        <Label htmlFor="company">Company</Label>
        <Input
          disabled={isLoading}
          id="company"
          name="company"
          placeholder="Company"
          value={data.company}
          onChange={(e) => handleDataChange(e)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="address_1">
          Address 1<Asterisk />
        </Label>
        <Input
          disabled={isLoading}
          id="address_1"
          name="address_1"
          placeholder="Address 1"
          value={data.address_1}
          onChange={(e) => handleDataChange(e)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="address_2">Address 2</Label>
        <Input
          disabled={isLoading}
          id="address_2"
          name="address_2"
          placeholder="Address 2"
          value={data.address_2}
          onChange={(e) => handleDataChange(e)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="postal_code">
          Postal code
          <Asterisk />
        </Label>
        <Input
          disabled={isLoading}
          id="postal_code"
          name="postal_code"
          placeholder="Postal code"
          value={data.postal_code}
          onChange={(e) => handleDataChange(e)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="city">
          City
          <Asterisk />
        </Label>
        <Input
          disabled={isLoading}
          id="city"
          name="city"
          placeholder="City"
          value={data.city}
          onChange={(e) => handleDataChange(e)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="country">
          Country
          <Asterisk />
        </Label>
        <CountrySelect
          disabled={isLoading}
          countries={regionOnlyCountries}
          value={data.country_code}
          onValueChange={(e) => handleCountryChange(e)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="province">State / Province</Label>
        <Input
          disabled={isLoading}
          id="province"
          name="province"
          placeholder="State / Province"
          value={data.province}
          onChange={(e) => handleDataChange(e)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">
          Email
          <Asterisk />
        </Label>
        <Input
          disabled={isLoading}
          id="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => handleDataChange(e)}
          type="email"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          disabled={isLoading}
          id="phone"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={(e) => handleDataChange(e)}
        />
      </div>

      <LoadingButton
        className="col-span-full w-fit"
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Continue to delivery
      </LoadingButton>
    </form>
  )
}
