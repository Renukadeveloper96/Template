import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './_shared/event-bus.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    // ngOnInit() {
    //     this.subscription = this.router.events
    //         .pipe(
    //             filter(event => event instanceof NavigationEnd)
    //         )
    //         .subscribe(() => window.scrollTo(0, 0));
    // }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private roles: string[] = [];
    isLoggedIn = false;
    // showAdminBoard = false;
    // showModeratorBoard = false;
    username?: string;
  
    eventBusSub?: Subscription;
  
    constructor(private router: Router,
      private storageService: StorageService,
      private authService: AuthService,
      private eventBusService: EventBusService
    ) {}
  
    ngOnInit(): void {
      this.isLoggedIn = this.storageService.isLoggedIn();
  
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;
  
        // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  
        this.username = user.username;
      }
  
      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.logout();
      });
    }
  
    logout(): void {
      this.authService.logout().subscribe({
        next: res => {
          console.log(res);
          this.storageService.clean();
  
          window.location.reload();
        },
        error: err => {
          console.log(err);
        }
      });
    }

}