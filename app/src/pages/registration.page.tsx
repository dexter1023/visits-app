import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {RegistrationForm} from '../components/RegistrationForm'
import { FC } from "react";
import { Link } from "react-router-dom";
import { useSnackbarContext } from "../context/snackbar.context";
import { UserRegistration } from "../models/user.model";
import {registry} from '../services/user.service'

const useStyles = makeStyles({
    card: {
        padding: '20px',
        width: '400px'
    }
})

export const RegistrationPage: FC = () => {
    const classes = useStyles()
    const {open} = useSnackbarContext()

    const onSubmit = async (data: UserRegistration) => {
        try {
            await registry(data)
            open('Pomyślnie utworzono konto. Możesz się teraz zalogować', 'success')
        } catch (error) {
            open('Błąd przy rejestracji. Spróbuj ponownie', 'error')
        }
    }

    return (
        <Card className={classes.card}>
            <Typography variant='h3' component='h1' align='center'>Rejestracja</Typography>
            <CardContent>
                <RegistrationForm onSubmit={onSubmit}/>
                <Link to="/login">Wróć do strony logowania</Link>
            </CardContent>
        </Card>
    )
}