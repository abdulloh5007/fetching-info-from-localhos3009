import LoginForm from "@/components/home/LoginForm"
import Head from "next/head"

function login() {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <LoginForm />
        </div>
    )
}

export default login