import { Header } from "@/components/header"
import { PageTitle } from "../_components/page-title"
import { SpanUsuario } from "../_components/span-usuario";

export  default async function dashboard(){
    // return redirect('/')  usar para autentificacao
    // const usuarios = await buscaUsuario();

    return (
        <div>
            <Header title="Teste" backTo="/"/>
            <PageTitle title="Teste"/>
            {/* <span className="w-1/2 md:w-3/12">Username: {usuarios.username}</span> */}
            <SpanUsuario />
        </div>
    )
}

// const buscaUsuario = async () => {
//     try{
//         const url = process.env.URL + "/api/teste" 
//         const res = await fetch(url);
//         return await res.json()
//     }catch(e){
//         return ''
//     }
// }