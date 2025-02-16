// import { auth } from "@/lib/auth";
import { NextRequest } from 'next/server'
// import { publicRoutes } from "@/routes";

// const verifyIsPublicRote = (endPointUrl: string) => {
//   return publicRoutes.includes(endPointUrl);
// }

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // const isPublicRote = verifyIsPublicRote(path);

  // if(path == "/teste") return NextResponse.redirect(new URL(routes.home, request.nextUrl).toString());

  console.log("acessando a rota: "+path)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}