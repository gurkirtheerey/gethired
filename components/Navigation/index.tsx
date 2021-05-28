import React, { useEffect } from "react";
import Button from "../Button";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "./Navigation.module.scss";
import { useUserValue } from "../../context/UserContext";
import { getUser } from "../../helpers/user";

const Navigation = () => {
  const [session] = useSession();
  const { setUser } = useUserValue();

  useEffect(() => {
    console.log("IN HERE");
    const fetchUser = async () => {
      console.log(session);
      if (session && session.user) {
        const user = await getUser(session.user);
        setUser(user);
      }
    };

    fetchUser();
  }, [session]);

  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <h1>Get Hired</h1>
      </div>
      <div>
        {!session ? (
          <Button onClick={() => signIn()}>Sign In</Button>
        ) : (
          <Button onClick={() => signOut()}>Sign Out</Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
