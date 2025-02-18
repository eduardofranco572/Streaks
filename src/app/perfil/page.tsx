import { Header } from "@/components/header"
import { PageTitle } from "../_components/page-title"

export  default async function Perfil(){
    return (
        <div>
            <Header title="Perfil" backTo="/"/>
            <PageTitle title="Perfil"/>
        </div>
    )
}
