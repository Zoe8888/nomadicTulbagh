import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { UntilDestroy } from '@ngneat/until-destroy';
import { LatLng, latLng, tileLayer } from 'leaflet';
import { ProfileQuery, ProfileService } from 'src/app/stores/profile';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
})
export class ProfileInfoPage implements OnInit {
  profile: any;
  uniqueId: any;
  wiki: any;

  options: L.MapOptions = {
    layers: [
      tileLayer(
        'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 18,
        }
      ),
    ],
    minZoom: 5,
    zoom: 12,
    maxZoom: 15,
    center: latLng(-33.715546, 18.966248),
    scrollWheelZoom: false,
    tap: false,
    zoomControl: false,
    attributionControl: false,
  };

  center: LatLng;
  ready: boolean;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private profileQuery: ProfileQuery,
    public sanitizer: DomSanitizer,
    private launchNavigator: LaunchNavigator
  ) {}

  async ngOnInit() {
    const { state } = this.router.getCurrentNavigation().extras;
    this.uniqueId = state.uniqueId;
    await this.profileService.getInfo(this.uniqueId);
    this.profileQuery
      .selectEntity((e) => e.uniqueId === this.uniqueId)
      .subscribe((profile: any) => {
        this.profile = profile;
        if (profile?.latitude) {
          this.center = new LatLng(
            Number(profile?.latitude),
            Number(profile?.longitude)
          );
        }
      });
    this.wiki = await this.profileService.getWiki(this.uniqueId);
  }

  ionViewDidEnter() {
    this.ready = true;
    if (this.profile?.latitude) {
      this.center = new LatLng(
        Number(this.profile?.latitude),
        Number(this.profile?.longitude)
      );
    }
  }

  onMapReady(map: L.Map) {}

  async takeMeThere() {
    if (Capacitor.isNativePlatform()) {
      await this.launchNavigator.navigate([
        Number(this.profile?.latitude),
        Number(this.profile?.longitude),
      ]);
    }
  }
}