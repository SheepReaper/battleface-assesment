import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-external-page',
  templateUrl: './external-page.component.pug',
  styleUrls: ['./external-page.component.scss'],
})
export class ExternalPageComponent implements OnInit {
  @Input()
  src = '';

  urlFromRoute: string | undefined;

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.data.subscribe(
      (data) => (this.urlFromRoute = data['src'] ?? '')
    );
  }

  ngOnInit(): void {
    const iframe = document.getElementById('embeddedPage') as HTMLIFrameElement;
    // iframe.style.height = `${window.innerHeight + 200}px`;
    iframe.contentWindow?.location.replace(
      this.src.length > 0 ? this.src : this.urlFromRoute ?? ''
    );
  }
}
