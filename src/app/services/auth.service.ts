import { inject, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase: SupabaseClient;
  supabaseUrl = 'https://wtjylfdfdwowzzvunlpa.supabase.co';
  supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0anlsZmRmZHdvd3p6dnVubHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDI0ODMsImV4cCI6MjA2ODM3ODQ4M30.fqCZIiw9N8PMjyCKCH1378bztIChdLfisXbEzbIkEfE';
  user = signal<User | null>(null);
  router = inject(Router);

  constructor() {
    this.supabase = createClient(this.supabaseUrl,this.supabaseKey);

    // detectar cuando se inicia o cierra sesion
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        this.user.set(null);
        this.router.navigateByUrl('/login');
        return;
      }

      this.supabase.auth.getUser().then(({ data, error }) => {
        this.user.set(data.user);
        this.router.navigateByUrl('/');
      });
    });
  }

  // esto crea el usuario en el sistema de autenticacion de Supabase
  async crearCuenta(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  // iniciar seccion
  async iniciarSesion(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  // cerrar seccion
  async cerrarSesion() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  // detectar cuando se inicia o cierra sesion
}