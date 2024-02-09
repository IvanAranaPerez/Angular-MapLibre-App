import { Component, ElementRef, Input, ViewChild} from '@angular/core';
import { Map,Marker } from 'maplibre-gl';

@Component({
  selector: 'map-minimap',
  templateUrl: './minimap.component.html',
  styleUrl: './minimap.component.css'
})
export class MinimapComponent {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;


  ngAfterViewInit() {
    if( !this.divMap?.nativeElement ) throw "Map Div not found";
    if( !this.lngLat ) throw "LngLat can't be null";

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'https://api.maptiler.com/maps/83a51e3e-0d44-44bd-9aa4-ab4bbddc0959/style.json?key=rP1KZxFN992dnJmbSWCk',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map )

  }
}


