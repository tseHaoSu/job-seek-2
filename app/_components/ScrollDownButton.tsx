'use client'

import { ChevronDown } from "lucide-react"

export default function ScrollDownButton() {
  return (
    <div
      className="absolute bottom-13 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white cursor-pointer"
      onClick={() => {
        document.getElementById("data")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <ChevronDown size={28} className="animate-bounce" />
      <span className="text-m mt-1">Scroll down to know more</span>
    </div>
  )
}
