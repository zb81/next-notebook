'use client'

import { useState } from "react"
import { useTranslations } from "next-intl"
import { signOut } from "next-auth/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function SignOut() {
  const t = useTranslations('Basic')
  const ts = useTranslations('SignOut')
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    signOut({ redirectTo: '/' }).then(() => {
      setOpen(false)
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='secondary' size='sm'>{t('signOut')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ts('title')}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{ts('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{ts('confirm')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
