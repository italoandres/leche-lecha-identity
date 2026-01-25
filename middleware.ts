import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Por enquanto, apenas permite acesso a todas as rotas
  // Quando o Supabase estiver configurado, adicione verificação de autenticação aqui
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/teste/:path*', '/resultado/:path*', '/leitura/:path*', '/acesso/:path*'],
};
