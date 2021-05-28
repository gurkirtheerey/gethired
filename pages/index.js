import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useUserValue } from "../context/UserContext";
import { getUser, setUserRole, setUserExperience } from "../helpers/user";
import axios from "axios";

export default function Home() {
  const [session] = useSession();
  const { user, setUser } = useUserValue();
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (session && session.user) {
        const user = await getUser(session.user);
        setUser(user);
      }
    };

    fetchUser();
  }, [session]);

  const setRole = async (bool) => {
    const response = await setUserRole(user.id, bool);
    setUser(response);
  };

  const setExperience = async (experience) => {
    const response = await setUserExperience(user.id, experience);
    setUser(response);
  };

  const setRepositories = async () => {
    try {
      const response = await axios.post("/api/auth/repositories", {
        id: user.id,
        text,
      });
      setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        {!session ? (
          <button onClick={() => signIn()}>Sign in</button>
        ) : (
          <button onClick={() => signOut()}>Sign out</button>
        )}
      </div>
      {user && user.isNew ? (
        <div>
          <h1>Looking for a job?</h1>
          <button onClick={() => setRole(false)}>Yes</button>
          <h1>Looking for developers</h1>
          <button onClick={() => setRole(true)}>Yes</button>
        </div>
      ) : (
        <h1>
          <div>
            <h1>Set Experience Level</h1>
            <button onClick={() => setExperience("Beginner")}>Beginner</button>
            <button onClick={() => setExperience("Medium")}>Medium</button>
            <button onClick={() => setExperience("Advanced")}>Advanced</button>
          </div>
        </h1>
      )}
      <h1>Initialize repositories</h1>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Enter github username"
      />
      <button onClick={() => setRepositories()}>Add Repositories</button>
    </div>
  );
}
