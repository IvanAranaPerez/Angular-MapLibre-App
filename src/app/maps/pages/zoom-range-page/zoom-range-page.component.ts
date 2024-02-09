import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map } from 'maplibre-gl';

import { environment } from '../../../../environments/environments';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements OnInit, AfterViewInit, OnDestroy {

  // map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  public zoom: number = 14

  public map?: Map | undefined;

  public lgnLat: LngLat = new LngLat(-86.81559702102251, 21.17772787158928)

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {

    if (typeof window !== 'undefined') {
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: `https://api.maptiler.com/maps/83a51e3e-0d44-44bd-9aa4-ab4bbddc0959/style.json?key=${environment.maptiler_key}`,
        center: this.lgnLat,
        zoom: this.zoom
      });
      this.mapListeners();
    }

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.lgnLat = this.map!.getCenter();
      // console.log(this.lgnLat);
    });
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }

}
