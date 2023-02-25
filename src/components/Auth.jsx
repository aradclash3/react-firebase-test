import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(auth?.currentUser?.email)


    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error)
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }


    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <input placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
            <input placeholder='Password...'
                onChange={(e) => setPassword(e.target.value)}
                type="password" />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign In with Google</button>

            <button onClick={logOut}>Log Out</button>
        </div>
    )
}


