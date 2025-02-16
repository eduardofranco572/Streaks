// import { Header } from "@/components/header";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect('/login')
  // return (
  //   <div>
  //     <Header title="Home" />
  //   </div>
  // );
}
