import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-quiensoy',
  imports: [CommonModule],
  templateUrl: './quiensoy.component.html',
  styleUrl: './quiensoy.component.css',
})
export class QuiensoyComponent implements OnInit {
  gitHubUser = signal<any>({});
  githubEntries = computed(() => Object.entries(this.gitHubUser()));

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://api.github.com/users/valverdecristian')
      .subscribe({
        next: (data) => this.gitHubUser.set(data),
        error: (err) => console.error('Error al obtener usuario', err),
      });
  }
}
