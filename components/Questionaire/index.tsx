import React, { useEffect, useState } from "react";
import axios from "axios";
import { setUserRole, setUserExperience } from "../../helpers/user";
import { useUserValue } from "../../context/UserContext";
import { useRouter } from "next/router";
import styles from "./Questionaire.module.scss";
import Button from "../Button";
import Input from "../Input";

const Questionaire = () => {
  const { user, setUser } = useUserValue();
  const [text, setText] = useState("");
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (
      user &&
      !user.isAdmin &&
      user.repositories &&
      user.repositories.length
    ) {
      router.push("/about");
    }
  }, [user]);

  const setRole = async (bool) => {
    const response = await setUserRole(user.id, bool);
    setUser(response);
    setCount((prevCount) => prevCount + 1);
  };

  const setExperience = async (experience) => {
    const response = await setUserExperience(user.id, experience);
    setUser(response);
    setCount((prevCount) => prevCount + 1);
  };

  const setRepositories = async () => {
    try {
      const response = await axios.post("/api/auth/repositories", {
        id: user.id,
        text,
      });
      setUser(response.data);
      setCount((prevCount) => prevCount + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <h4>Answer some questions to receive the most out of Get Hired!</h4>
      {user && count === 0 && (
        <div className={styles.form}>
          <div>
            <span>Are you a Developer looking for a job?</span>
            <Button onClick={() => setRole(false)}>I'm a Dev 👨‍💻</Button>
          </div>
          <div>
            <span>
              <strong>Or</strong> a recruiter looking for the right candidate?
            </span>
            <Button primary onClick={() => setRole(true)}>
              Looking for someone 👀
            </Button>
          </div>
        </div>
      )}
      {user && !user.isAdmin && count === 1 && (
        <div className={styles.form}>
          <h2>Set Experience Level</h2>
          <div>
            <Button primary onClick={() => setExperience("Beginner")}>
              Beginner
            </Button>
            <Button primary onClick={() => setExperience("Medium")}>
              Medium
            </Button>
            <Button primary onClick={() => setExperience("Advanced")}>
              Advanced
            </Button>
          </div>
        </div>
      )}
      {user && !user.isAdmin && count === 2 && (
        <div className={styles.form}>
          <h2>Bring in your GitHub repos!</h2>
          <Input
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Enter github username"
          />
          <Button onClick={() => setRepositories()}>Add Repositories</Button>
        </div>
      )}
    </div>
  );
};

export default Questionaire;
