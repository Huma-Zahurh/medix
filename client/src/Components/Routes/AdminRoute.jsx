import { useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
