import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faExclamationTriangle, faInfo } from '@fortawesome/free-solid-svg-icons'
import { useToastStore, Toast as ToastType } from '@/stores/toast'
import { cn } from '@/lib/utils'

const toastIcons = {
  success: faCheck,
  error: faXmark,
  warning: faExclamationTriangle,
  info: faInfo,
}

const toastStyles = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
}

interface ToastProps {
  toast: ToastType
}

function Toast({ toast }: ToastProps) {
  const removeToast = useToastStore(state => state.removeToast)

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [toast.id, removeToast])

  return (
    <div className={cn('alert my-4 flex justify-start items-center', toastStyles[toast.type])}>
      <FontAwesomeIcon icon={toastIcons[toast.type]} className="mt-1" size="2x" />
      <div>{toast.message}</div>
    </div>
  )
}

export function ToastContainer() {
  const toasts = useToastStore(state => state.toasts)

  if (toasts.length === 0) return null

  return (
    <div className="absolute z-30 top-0 right-0 me-4" role="alert">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}