import { Component, model, signal } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Form } from './components/form/form';
import { FormLabel } from './components/form/form-label';

import { FormItem } from './components/form/form-item';
import { FormControlDirective } from './components/form/br-form.directive';
import { BrSelectComponent } from './components/br-select/br-select.component';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    Form,
    FormLabel,
    FormItem,
    ReactiveFormsModule,
    FormControlDirective,
    BrSelectComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('br-angular');

  modalOpen = model<boolean>(false);

  activeTab = model<string>('about');

  framework = signal<string | null>(null);

  frameworks = signal([
    // Frameworks Principais
    { value: 'ng', label: 'Angular' },
    { value: 'rx', label: 'React' },
    { value: 'vu', label: 'Vue' },
    { value: 'sv', label: 'Svelte' },
    { value: 'em', label: 'Ember.js' },

    // Meta-Frameworks
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'svk', label: 'SvelteKit' },
    { value: 'astr', label: 'Astro' },
    { value: 'remix', label: 'Remix' },
    { value: 'gtby', label: 'Gatsby' },

    // Outras Bibliotecas e Frameworks Populares
    { value: 'preact', label: 'Preact' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'lit', label: 'Lit' },
    { value: 'alpine', label: 'Alpine.js' },

    // Bibliotecas de UI e Estilização
    { value: 'tw', label: 'Tailwind CSS' },
    { value: 'bs', label: 'Bootstrap' },
    { value: 'mui', label: 'Material-UI (MUI)' },

    // Ferramentas de Build e Compiladores
    { value: 'vite', label: 'Vite' },
    { value: 'webpack', label: 'Webpack' },
    { value: 'esbuild', label: 'esbuild' },

    // Backend & Runtimes
    { value: 'node', label: 'Node.js' },
    { value: 'express', label: 'Express.js' },
    { value: 'nest', label: 'NestJS' },
    { value: 'django', label: 'Django' },
    { value: 'rails', label: 'Ruby on Rails' },

    // Legado Influente
    { value: 'jq', label: 'jQuery' },
    { value: 'bb', label: 'Backbone.js' },
  ]);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    observacao: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    frameworkId: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
