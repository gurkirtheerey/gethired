import axios from "axios";

export const getUser = async (user) => {
  try {
    const res = await axios.post("/api/auth/user", {
      user,
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const setUserRole = async (id, bool) => {
  try {
    const res = await axios.post("/api/auth/role", { id, role: bool });
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const setUserExperience = async (id, experience) => {
  try {
    const res = await axios.post("/api/auth/experience", { id, experience });
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
