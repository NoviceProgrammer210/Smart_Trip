import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@/components/ui/dialog"

export default function SearchForm() {
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (destination) params.append("destination", destination)
    if (date) params.append("date", date) // optional, only if you’ll support it in backend
    if (minPrice) params.append("min_price", minPrice)
    if (maxPrice) params.append("max_price", maxPrice)

    navigate(`/trips?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 bg-transparent text-blue-50"
    >
      {/* Destination */}
      <Input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      {/* Date (optional if supported in backend) */}
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Price range */}
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Min Budget"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max Budget"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between gap-2">
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="w-1/2 text-amber-950"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="w-1/2 bg-amber-600 hover:bg-amber-700"
        >
          Find Trips
        </Button>
      </div>
    </form>
  )
}
