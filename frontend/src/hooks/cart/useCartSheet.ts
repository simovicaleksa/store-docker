"use client"

import { atom, useAtom } from "jotai"

const CartSheetAtom = atom<boolean>(false)

export default function useCartSheet() {
  const [open, setOpen] = useAtom(CartSheetAtom)

  return { open, setOpen }
}
