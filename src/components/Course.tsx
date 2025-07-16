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
      <AlertDialogContent
        className="h-[80vh] max-w-[80vw] overflow-hidden border-0 p-0 sm:max-w-[unset]"
        style={{ maxHeight: image.height, maxWidth: image.width }}
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
      </AlertDialogContent>
    </AlertDialog>
  )
}
