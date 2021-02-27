import React, {FC} from 'react'
import {useForm} from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { AuthRequest } from "../models/auth.model"
import { makeStyles } from "@material-ui/core"

interface LoginFormProps {
    onSubmit: (data: AuthRequest) => void
}

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column'
    }
})

export const LoginForm: FC<LoginFormProps> = ({onSubmit}) => {
    const {register, handleSubmit, errors} = useForm()
    const classes = useStyles()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <TextField
                id="email"
                name="email"
                type="email"
                label="Adres email"
                inputRef={register({required: 'Email jest wymagany'})}
                error={!!errors.email}
            />
            <TextField 
                id="password"
                name="password"
                type="password"
                label="Hasło"
                inputRef={register({required: 'Hasło jest wymagane'})}
                error={!!errors.password}
            />
            <Button type="submit" style={{marginTop: '20px'}} color='primary' variant='contained'>Zaloguj się</Button>
        </form>
    )
}