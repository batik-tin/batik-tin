import {
  Carousel as BaseCarousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { ImageMetadata } from 'astro'

type Props = {
  images: ImageMetadata[]
}

export function Carousel({ images }: Props) {
  return (
    <BaseCarousel>
      <CarouselContent>
        {[...images, ...images, ...images].map(image => (
          <CarouselItem>
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              className="rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </BaseCarousel>
  )
}
