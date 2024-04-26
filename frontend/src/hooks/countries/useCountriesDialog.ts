"use client"

import { atom, useAtom } from "jotai"

const CountriesDialog = atom<boolean>(false)

export default function useCountriesDialog() {
  const [open, setOpen] = useAtom(CountriesDialog)

  return { open, setOpen }
}
