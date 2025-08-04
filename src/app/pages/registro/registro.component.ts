import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  formRegistro: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.formRegistro = this.fb.group(
      {
        usuario: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        genero: ['', Validators.required],
        contraseña: ['', [Validators.required, Validators.minLength(6)]],
        confirmar: ['', Validators.required],
      },
      { validators: this.validarPassword }
    );
  }

  validarPassword(group: AbstractControl): { mismatch: true } | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmar')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  async registrarUsuario() {
    if (this.formRegistro.invalid) return;

    const { nombre, email, genero } = this.formRegistro.value;

    try {
      await this.auth.insertarUsuarioChat({ nombre, email, genero });
      console.log('Usuario insertado en usuarios_chat');
      // Mostrar éxito, limpiar formulario, etc.
    } catch (error: any) {
      console.error('Error al insertar:', error.message);
      // Mostrar alerta visual
    }
  }
}
