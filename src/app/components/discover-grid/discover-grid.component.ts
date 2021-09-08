import { Component, OnInit } from '@angular/core';
import { IonicSwiper } from '@ionic/angular';
import SwiperCore from 'swiper';

SwiperCore.use([IonicSwiper]);

@Component({
  selector: 'app-discover-grid',
  templateUrl: './discover-grid.component.html',
  styleUrls: ['./discover-grid.component.scss'],
})
export class DiscoverGridComponent implements OnInit {
  groups = [
    [
      { title: 'Accomodations', icon: 'bed-outline' },
      { title: 'Adventure', icon: 'bicycle-outline' },
    ],
    [
      { title: 'Taste', icon: 'wine-outline' },
      { title: 'Culture', icon: 'prism-outline' },
    ],
    [
      { title: 'Explore', icon: 'telescope-outline' },
      { title: 'Eat', icon: 'fast-food-outline' },
    ],
    [
      { title: 'Family', icon: 'people-outline' },
      { title: 'Shopping', icon: 'cart-outline' },
    ],
    [
      { title: 'Wellness', icon: 'heart-circle-outline' },
      { title: 'Tours', icon: 'map-outline' },
    ],
    [
      { title: 'Venues', icon: 'business-outline' },
      { title: 'More', icon: 'sparkles-outline' },
    ],
  ];
  constructor() {}

  ngOnInit() {}
}
