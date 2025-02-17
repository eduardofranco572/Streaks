"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import AuthCard from "@/components/AuthCard";

export default function Signup() {
    const router = useRouter();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        name: "",
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

        const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
                },
            });

            Toast.fire({
                icon: "success",
                title: "Cadastrado com sucesso!",
            });

            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } else {
            console.error("Erro ao cadastrar:", data.error);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
                },
            });

            Toast.fire({
                icon: "error",
                title: "Erro ao cadastrar, tente novamente.!",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <AuthCard
            title="Cadastro"
            subtitle="Crie sua conta preenchendo os campos abaixo"
            buttonText="Cadastrar"
            fields={[
            { label: "Nome", type: "text", placeholder: "Nome completo", name: "name" },
            { label: "Email", type: "email", placeholder: "Email", name: "email" },
            { label: "Senha", type: "password", placeholder: "Senha", name: "password" },
            ]}
            linkText="Já tem uma conta?"
            linkHref="/login"
            handleChange={handleChange}
            errors={errors}
        />
        </form>
    );
}
