"use client";
import { useEffect } from "react";
import Register from "../components/register";
import { redirect } from 'next/navigation'

export default function register() {

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     redirect("/login");
  //   }
  // }, []);

  return <Register />;
}
