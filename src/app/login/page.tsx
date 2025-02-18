"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import AuthCard from "@/components/AuthCard";

export default function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Campo obrigatório";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      callbackUrl: "/perfil",
    });

    if (response?.error) {
      Swal.fire({
        icon: "error",
        title: "Erro no login",
        text: "Email ou senha inválidos!",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Login realizado!",
        text: "Redirecionando...",
        timer: 1000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/perfil");
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthCard
        title="Login"
        subtitle="Preencha abaixo para acessar sua conta"
        buttonText="Login"
        fields={[
          { label: "Email", type: "email", placeholder: "Email", name: "email" },
          { label: "Senha", type: "password", placeholder: "Senha", name: "password" },
        ]}
        linkText="Não possui uma conta?"
        linkHref="/signup"
        handleChange={handleChange}
        errors={errors}
      />
    </form>
  );
}
