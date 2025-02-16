import AuthCard from "@/components/AuthCard";

export default function Signup() {
    return (
        <AuthCard
            title="Cadastro"
            subtitle="Crie sua conta preenchendo os campos abaixo"
            buttonText="Cadastrar"
            fields={[
                { label: "Nome", type: "text", placeholder: "Nome completo" },
                { label: "Email", type: "email", placeholder: "Email" },
                { label: "Senha", type: "password", placeholder: "Senha" }, 
            ]}
            linkText="Já tem uma conta?"
            linkHref="/login"
        />
    );
}
