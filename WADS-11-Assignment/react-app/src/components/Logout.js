import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Logout.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Logout() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="logout">
       <div className="logout__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <div></div>
         <div>Do you want to log out?</div>
         <button className="logout__btn" onClick={logout}>
          Yes
         </button>
         <button className="logout__btn" onClick={ () => navigate("/dashboard") }>
          No
         </button>
       </div>
     </div>
  );
}
export default Logout;