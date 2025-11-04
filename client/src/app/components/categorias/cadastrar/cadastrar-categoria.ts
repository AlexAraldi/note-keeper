import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { CadastrarCategoriaModel, CadastrarCategoriaResponseModel } from '../categoria.models';
import { finalize, Observer, PartialObserver } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';

@Component({
  selector: 'app-cadastrar-categoria',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-categoria.html',
})
export class CadastrarCategoria {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly categoriaService = inject(CategoriaService);
  protected readonly router = inject(Router);

  protected categoriaForm: FormGroup = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  public cadastrar() {
    if (this.categoriaForm.invalid) return;

    const categoriaModel: CadastrarCategoriaModel = this.categoriaForm.value;

    const cadastroObservable: Observer<CadastrarCategoriaResponseModel> = {
      next: (res) => console.log(res),
      error: (err) => console.error('Aconteceu um erro na observable', err),
      complete: () => this.router.navigate(['/categorias']),
    };

    this.categoriaService.cadastrar(categoriaModel).subscribe(cadastroObservable);
  }
}
