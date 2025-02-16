"use client"

// import { Button } from "@/components/ui/button";
// import { routes } from "@/routes";
// import { replacePathParams } from "@/utils/replace-path-params";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react"

export const SpanUsuario = () => {
    // const [usuario,setUsuario] = useState('');
    // const router = useRouter()
    // const id = 2;

    // const url = replacePathParams(routes.usuario, { id });

    // useEffect(() => {
    //     const buscaUsuario =  async () => {
    //         const url =  "/api/teste"
    //         console.log('url',url)
    //         const res = await fetch(url);
    //         const  usuario = await res.json()
    //         setUsuario(usuario.username)
    //     }

    //      buscaUsuario();
    // },[])
    return (
        <>
            <div className="flex mt-5 items-center">
                {/* <span>Usuário logado: {usuario}</span>
                <Button className="ml-2" onClick={() => router.push(url)}>Home</Button> */}
            </div>
        </>
    )
}