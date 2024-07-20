"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export const Context = createContext({ user: {}, setUser: () => { } })

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('/api/auth/me')
            .then((res) => res.ok ? res.json() : {} )
            .then((data) => {
                if (data.success) setUser(data.user);
            })
    }, [])

    return <Context.Provider
        value={{
            user,
            setUser
        }}
    >
        {children}
        <Toaster />
    </Context.Provider>
}
export const LogoutBtn = () => {
    const logoutHandler = async () => {
        try {
            const res = await fetch('/api/auth/logout');

            const data = await res.json();

            if (!data.success) toast.error(data.message);

            setUser({});

            toast.success(data.message);

            redirect('/login');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const { user } = useContext(Context);

    return (
        <>
            {
                user._id ? (
                    <button className="btn" onClick={logoutHandler}>
                        Logout
                    </button>
                ) : (
                    <Link href={'/login'}>Login</Link>
                )
            }

        </>
    )
}

// export const TodoButton = ({id, completed}) => {
//     const deleteHandler = (id) => {

//     }

//     return (
//         <>
//             <input type="checkbox" checked={completed} />
//         </>
//     )
// }

