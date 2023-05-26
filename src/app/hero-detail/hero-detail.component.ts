import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  id:string =""
  message= ''
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero(this.route.snapshot.params['id']);

  }

  getHero(id:string): void {
    
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero
        console.log(hero)
      });
  }

  update(name:any, power:any, weakness:any):void{
    const data = {name, power, weakness}
    if (data.name === ""){
      this.message = "Field cannot not be empty"
      return
    }else this.message = ""
    const id =  this.route.snapshot.params['id']
    this.heroService.updateHero(id, data).subscribe({
      next: (hero)=>{
        console.log(hero)
      },
      error(err) {
        console.log(err)
      },
    }
    )
  }
  removeHero(){
    const id = this.route.snapshot.params['id']
    this.heroService.removeHero(id)
      .subscribe(hero => {
        this.hero = hero
        console.log(hero)
      });
  }
  goBack(): void {
    this.location.back();
  }
}