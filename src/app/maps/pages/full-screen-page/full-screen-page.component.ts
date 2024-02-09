import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map } from 'maplibre-gl';

import { environment } from '../../../../environments/environments';



@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const initialState = { lng: -86.81559702102251, lat: 21.17772787158928, zoom: 14 };

      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: `https://api.maptiler.com/maps/83a51e3e-0d44-44bd-9aa4-ab4bbddc0959/style.json?key=${environment.maptiler_key}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      });
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
