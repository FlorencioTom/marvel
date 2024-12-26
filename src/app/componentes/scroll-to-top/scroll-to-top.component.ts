import { Component, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  imports: [MatIconModule],
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements AfterViewInit, OnDestroy {
  @Input() threshold: number = 100; // El umbral de scroll para mostrar el botón
  @Input() scrollContainer!: any; // Contenedor donde se detecta el scroll
  showScrollTop: boolean = false;

  private scrollListener!: () => void;

  ngAfterViewInit() {
    // Aseguramos que el contenedor es válido antes de añadir el listener
    if (this.scrollContainer) {
      this.scrollListener = () => this.checkScrollPosition();
      this.scrollContainer.nativeElement.addEventListener('scroll', this.scrollListener);
    }
  }

  ngOnDestroy() {
    // Limpiamos el listener cuando el componente se destruya
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.removeEventListener('scroll', this.scrollListener);
    }
  }

  // Función que verifica la posición del scroll
  checkScrollPosition() {
    const scrollTop = this.scrollContainer.nativeElement.scrollTop;
    if (scrollTop > this.threshold) {
      this.showScrollTop = true; // Mostrar el botón si el scroll supera el umbral
    } else {
      this.showScrollTop = false; // Ocultar el botón si el scroll no supera el umbral
    }
  }

  // Función para hacer scroll hacia arriba
  scrollToTop() {
    this.scrollContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
}