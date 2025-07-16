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
  itemClass?: string
}

export function Carousel({ name, images, itemClass }: Props) {
  return (
    <div>
      <BaseCarousel>
        <div className="overflow-hidden rounded-lg">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image.src} className={itemClass}>
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  style={index === 0 ? { viewTransitionName: name } : undefined}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="h-full rounded-lg object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <CarouselPrevious />
        <CarouselNext />
      </BaseCarousel>
    </div>
  )
}
