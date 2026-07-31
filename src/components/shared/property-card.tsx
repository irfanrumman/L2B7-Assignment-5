"use client";

import Link from 'next/link'
import { Bed, Bath, MapPin, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PropertyCardProps {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  image: string
  featured?: boolean
}

export function PropertyCard({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  image,
  featured = false,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-48 sm:h-56">
          <div className="h-full w-full bg-linear-to-br from-muted to-muted-foreground/10 flex items-center justify-center text-muted-foreground">
            <span className="text-sm">{image}</span>
          </div>
          {featured && (
            <Badge variant="secondary" className="absolute top-3 right-3">
              Featured
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute top-3 left-3 rounded-full bg-card shadow-md hover:bg-primary hover:text-primary-foreground"
            aria-label="Save property"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <CardContent className="flex flex-col gap-4 pt-4">
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>

          {/* Specs */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Monthly Price</p>
              <p className="font-bold text-lg text-primary">
                ${price.toLocaleString()}
              </p>
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              size="sm"
            >
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
