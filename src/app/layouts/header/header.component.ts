import { Component } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site } from '../../model/Site';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  sites: Site[] = [];
  name:string='';
  selectedSite! : Site;
  /**
   *
   */
  constructor(private site_service: SiteService,private router: Router,private cookieService : CookieService) {
    
  }

  ngOnInit(): void{
    this.cookieService.set("id","0")
    this.site_service.getSites().subscribe({
      next:(sites) => {this.sites = sites}
    ,
    error: (error)=> console.error(error)})
  }

  Select(){
    console.log(this.selectedSite)
    this.cookieService.set("id",this.selectedSite.id.toString())
    this.router.navigate(['/dashboard']).then(() => {
      window.location.reload();
    });
  }
}
