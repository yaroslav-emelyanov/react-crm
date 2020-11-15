import { toast } from 'materialize-css'

export const notification = {
  info: (text: string) => {
    toast({ html: text })
  },
  error: (text: string) => {
    toast({ html: `[Ошибка]: ${text}` })
  },
}
