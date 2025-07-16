import {
  Carousel as BaseCarousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { ImageMetadata } from 'astro'

type Props = {
  name?: string
  images: ImageMetadata[]
}

export function Carousel({ name, images }: Props) {
  return (
    <BaseCarousel>
      <CarouselContent>
        {[...images, ...images, ...images].map((image, index) => (
          <CarouselItem>
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              style={index === 0 ? { viewTransitionName: name } : undefined}
              loading={index === 0 ? 'eager' : 'lazy'}
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
