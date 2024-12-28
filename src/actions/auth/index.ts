'use server';

import { AuthError, AuthResponse } from '@supabase/auth-js';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { IWithUserCredentialsParams } from '@/actions/auth/common/types';

export async function singInWithEmailAndPassword(
  params: IWithUserCredentialsParams
): Promise<AuthResponse> {
  const supabase = await createSupabaseServerClient();

  return await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });
}

export async function singUpWithEmailAndPassword(
  params: IWithUserCredentialsParams
): Promise<AuthResponse> {
  const supabase = await createSupabaseServerClient();

  return await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
    },
  });
}

export async function logout(): Promise<{ error: AuthError | null }> {
  const supabase = await createSupabaseServerClient();

  return await supabase.auth.signOut();
}

export async function isUserAlreadyLogged(): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();

  return !!session?.session?.access_token;
}
