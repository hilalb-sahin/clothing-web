import SignUpForm from "../../components/sign-up-form-email/sign-up.email.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'

const Authentication = ()=> {

    return(
        <div className="auth-container">
            <SignUpForm />
            <SignInForm />

        </div>
    )
}

export default Authentication