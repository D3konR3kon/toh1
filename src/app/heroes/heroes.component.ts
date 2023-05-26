import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectdHero = {}
  constructor(private heroService: HeroService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHeroes();
    
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
  getHero(): void {
    const id = this.route.snapshot.params['id']
    this.heroService.getHero(id)
      .subscribe({
        next: (data) => {
          this.selectdHero = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  add(name: string,power:string,weakness:string){
    const data = {name, power, weakness}
    this.heroService.addHero(data).subscribe({
      next: (data)=>{
        console.log(data)
      },
      error(err) {
        console.error(err)
      },
    })
  }
  
}