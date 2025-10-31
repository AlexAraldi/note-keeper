import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CategoriaService } from '../categoria.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listar-categorias',
  imports: [MatButtonModule, MatIconModule, RouterLink, AsyncPipe, MatCardModule],
  templateUrl: './listar-categorias.html',
})
export class ListarCategorias {
  protected readonly categoriaService = inject(CategoriaService);
  protected readonly categorias$ = this.categoriaService.selecionarTodas();
}
