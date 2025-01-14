'use client'

import { useTranslations } from 'next-intl'

import { Button } from './ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { deleteNote } from '@/actions/note'

export default function DeleteButton({ noteId }: { noteId: string }) {
  const t = useTranslations('Delete')

  const onDeleteNote = async () => {
    try {
      await deleteNote(noteId)
      toast({
        title: t('success'),
      })
    } catch (e) {
      console.log(e)
      toast({
        title: t('error'),
        variant: 'destructive',
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteNote}>
            {t('confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
