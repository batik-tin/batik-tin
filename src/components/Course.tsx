import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import type { ImageMetadata } from 'astro'

type Props = {
  title: string
  image: ImageMetadata
}

export default function Course({ title, image }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <img src={image.src} loading="lazy" alt={title} className="h-[600px] w-full object-cover" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div
          style={{ height: image.height, width: image.width }}
          className="max-h-[calc(100vh-48px)] max-w-[calc(100vw-48px)] overflow-hidden rounded-md shadow-md sm:m-auto sm:max-w-lg"
        >
          <AlertDialogTitle className="sr-only">{title}</AlertDialogTitle>
          <AlertDialogCancel className="h-full w-full border-0 p-0">
            <img
              src={image.src}
              loading="lazy"
              alt={title}
              className="block h-full w-full object-cover"
            />
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
