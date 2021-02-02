import {Route, Redirect} from 'react-router'

export default function UnauthenticatedRote({ component: C, appProps, ...rest }) {
    return (
        <Route
        {...rest}
        render={props =>
            !appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <Redirect to="/" />}
        />
    )
}
