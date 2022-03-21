import React from 'react'
import styles from "../../styles/Login.module.scss";
import { useState } from 'react';
import { useRouter } from 'next/router';

type Props = {}

export default function Login({ }: Props) {

    const [info, setInfo] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(false);

    const router = useRouter();

    const changeHandler = (e: React.ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setInfo({
            ...info,
            [name]: value
        })
    }

    const handleClick = async () => {
        try {
            const res = await fetch(`/api/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            });

            if (res.status !== 200) {
                setError(true);
                return;
            }

            router.push("/admin");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Admin Dashboard</h1>
                <input
                    placeholder="username"
                    className={styles.input}
                    onChange={changeHandler}
                    name="username"
                />
                <input
                    placeholder="password"
                    type="password"
                    className={styles.input}
                    onChange={changeHandler}
                    name="password"
                />
                <button onClick={handleClick} className={styles.button}>
                    Sign In
                </button>
                {error && <span className={styles.error}>Wrong Credentials!</span>}
            </div>
        </div>
    )
}