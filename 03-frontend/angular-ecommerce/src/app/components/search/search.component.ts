import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // inject the router into our component
  constructor(private router:Router) { } 

  ngOnInit(): void {
  }

  // add the method that's being called by the html page
  doSearch(value: string){
    console.log(`the value = ${value}`);
    // call the route with the given keyword (app.module.ts)
    // {path: "search/:keyword", component: ProductListComponent} -> must exactly be like this
    this.router.navigateByUrl(`/search/${value}`);
  }

}
