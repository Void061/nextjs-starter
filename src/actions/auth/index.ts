'use server';

import { AuthError, AuthResponse } from '@supabase/auth-js';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import {
  IAuthResponse,
  IWithUserCredentialsParams,
} from '@/actions/auth/common/types';
import { DEFAULT_HEADERS } from '@/core/common/constants';
import { STORE_USER_IN_DB } from '@/actions/auth/routes';

export async function signInWithEmailAndPassword(
  params: IWithUserCredentialsParams
): Promise<AuthResponse> {
  const supabase = await createSupabaseServerClient();

  return await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });
}

export async function signUpWithEmailAndPassword(
  params: IWithUserCredentialsParams
): Promise<IAuthResponse> {
  const supabase = await createSupabaseServerClient();

  const authResponse = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
  });

  if (authResponse.error)
    return { error: new Error(authResponse.error.message) };

  // Store user on local DB
  if (authResponse?.data.user?.id && authResponse.data.session?.access_token) {
    const headers = {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${authResponse.data.session.access_token}`,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${STORE_USER_IN_DB}`,
      {
        headers,
        method: 'POST',
        body: JSON.stringify({
          id: authResponse.data.user.id,
          name: params.name,
          surname: params.surname,
          email: params.email,
          theme: params.theme,
          country: params.country,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.json();

      return { error: new Error(errorBody.message) };
    }
  }

  return {
    data: authResponse.data,
    error: authResponse.error,
  };
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
