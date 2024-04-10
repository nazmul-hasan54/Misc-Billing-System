import { Component, HostListener, OnInit } from '@angular/core';
import { fadeAnimation } from '../../../shared/animations/fade-animation';
import { ModalService } from '../../../shared/modal/modal.service';

@Component({
  selector: 'ngx-basic-top-navbar',
  templateUrl: './basic-top-navbar.component.html',
  styleUrls: ['./basic-top-navbar.component.scss'],
  animations: [fadeAnimation]
})
export class BasicTopNavbarComponent implements OnInit {
  isToggleIcon = true;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  openModal(id: string) {
    this.isToggleIcon = false
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.isToggleIcon = true
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80) {
      document.getElementById('header').classList.add('header-scrolled');
    } else {
      document.getElementById('header').classList.remove('header-scrolled');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (document.body.offsetWidth > 991 || document.documentElement.offsetWidth > 991) {
      this.closeModal('mobileNav__modal');
    }
  }

  
}
