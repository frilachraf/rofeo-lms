import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../ui/alert'

export default function Error({error}) {
  return (
    <Alert variant="destructive" className={'bg-red-100/70 font-semibold border-none border-red-500'}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  )
}
