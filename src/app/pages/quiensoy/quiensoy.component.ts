import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-quiensoy',
  imports: [],
  templateUrl: './quiensoy.component.html',
  styleUrl: './quiensoy.component.css',
})
export class QuiensoyComponent implements OnInit {
  nombre: string = '';
  avatar: string = '';
  bio: string = '';

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getUserData().subscribe((data: any) => {
      this.nombre = data.name;
      this.avatar = data.avatar_url;
      this.bio = data.bio;
    })
  }
}
