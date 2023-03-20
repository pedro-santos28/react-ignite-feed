import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dateFormated = (date: Date) => {
    return formatDistanceToNow(new Date (date), {
        locale: ptBR,
        addSuffix: true
    })
}

export const relativeDateFormated = (date: Date) => {
    return formatDistanceToNow(new Date (date), {
        locale: ptBR,
        addSuffix: true
    })
}