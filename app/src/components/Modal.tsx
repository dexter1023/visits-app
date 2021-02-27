import {FC} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from "@material-ui/core/DialogTitle"

interface ModalProps {
    open: boolean
    title: string
}

export const Modal: FC<ModalProps> = ({open, title, children}) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog>
    )
}