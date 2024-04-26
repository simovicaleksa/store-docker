import { Coins, CreditCard } from "lucide-react"

export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  stripe: {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "stripe-ideal": {
    title: "iDeal",
    icon: <CreditCard />,
  },
  "stripe-bancontact": {
    title: "Bancontact",
    icon: <CreditCard />,
  },
  paypal: {
    title: "PayPal",
    icon: <CreditCard />,
  },
  manual: {
    title: "Pay on delivery",
    icon: <Coins />,
  },
}

export const STRIPE_PUBLISH_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY ??
  "pk_test_51OCOKVIDE8iB0cPm24Q6TAyTkvqC5p1DxbqcOgNSuR2fbPWdwxCZtvgj1eOTuCz05FkhZSaZAKCUBJBxcF26zQHv00SjDjnk9K"
