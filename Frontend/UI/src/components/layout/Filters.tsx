import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Filters() {
  const [price, setPrice] = useState({ min: 10000, max: 50000 })
  const [rating, setRating] = useState<number | null>(null)
  const [tripTypes, setTripTypes] = useState<string[]>([])

  const handleCheckbox = (type: string) => {
    setTripTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const applyFilters = () => {
    console.log({ price, rating, tripTypes })
    // Later: call Django API with filters
  }

  return (
    <div className="w-64 p-4 bg-gray-900 rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-amber-100">Filters</h2>

      {/* Price Range */}
      <div>
        <Label className="text-amber-100">Price Range (₹)</Label>
        <div className="flex gap-2 mt-2">
          <Input
            type="number"
            value={price.min}
            onChange={(e) => setPrice({ ...price, min: +e.target.value })}
            className="w-20 bg-amber-50"
          />
          <span>-</span>
          <Input
            type="number"
            value={price.max}
            onChange={(e) => setPrice({ ...price, max: +e.target.value })}
            className="w-20 bg-amber-50"
          />
        </div>
      </div>

<br />
      {/* Rating */}
      <div>
        <Label className="text-amber-100">Minimum Rating</Label>
        <br />
        <Select onValueChange={(val) => setRating(+val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4★ & up</SelectItem>
            <SelectItem value="3">3★ & up</SelectItem>
            <SelectItem value="2">2★ & up</SelectItem>
          </SelectContent>
        </Select>
      </div>

<br />
      {/* Trip Type */}
      <div>
        <Label className="text-amber-100">Trip Type</Label>
        <div className="space-y-2 mt-2 ">
          {["Adventure", "Beach", "Culture", "Food & Wine", "Honeymoon", "Wellness"].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                checked={tripTypes.includes(type)}
                onCheckedChange={() => handleCheckbox(type)}
              />
              <span className="text-emerald-300">{type}</span>
            </div>
          ))}
        </div>
      </div>
      <br />

      {/* Sort By */}
      <div>
        <Label className="text-amber-100">Sort By</Label>
        <br />
        <Select>
          <SelectTrigger >
            <SelectValue placeholder="Recommended"  />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceLow">Price: Low to High</SelectItem>
            <SelectItem value="priceHigh">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Apply */}
      <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
    </div>
  )
}
