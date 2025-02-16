import AuthCard from "@/components/AuthCard";

export default function Login() {
    return (
        <AuthCard
            title="Login"
            subtitle="Digite seu e-mail para acessar sua conta"
            buttonText="Login"
            fields={[
                { label: "Email", type: "email", placeholder: "Email" },
                { label: "Senha", type: "password", placeholder: "Senha" }
            ]}
            linkText="Não possui uma conta?"
            linkHref="/signup"
        />
    );
}
