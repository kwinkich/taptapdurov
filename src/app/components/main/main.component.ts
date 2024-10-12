import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TapDataService } from '../../sData/tap-data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  providers: [TapDataService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('mainButton', { static: false })
  btnEl: ElementRef<HTMLElement> | null = null;

  public isAnimation: boolean = false;
  private time: number = 0;
  private tap: number = 0;
  private timeoutRef: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private DataService: TapDataService
  ) {}

  ngOnInit(): void {
    this.getTime();
  }

  ngAfterViewInit(): void {
    if (this.btnEl) {
      console.log('btn', this.btnEl.nativeElement);
    }
  }

  public toCorrectTime = () => {
    let milliseconds = this.time;

    const hours = Math.floor(milliseconds / 3_600_000);
    milliseconds %= 3_600_000;

    const minutes = Math.floor(milliseconds / 60_000);
    milliseconds %= 60_000;

    const seconds = Math.floor(milliseconds / 1000);
    milliseconds %= 1000;

    return `${hours > 0 ? `${hours} hours` : ''} ${
      minutes > 0 ? `${minutes} minutes` : ''
    }  ${seconds > 0 ? `${seconds} seconds` : ''} ${milliseconds} milliseconds`;
  };

  private renderTap = (event: MouseEvent) => {
    const value = this.renderer.createElement('div');
    this.renderer.setStyle(value, 'color', '#229ED9');
    this.renderer.addClass(value, 'value');
    this.renderer.setStyle(value, 'position', 'absolute');
    this.renderer.setStyle(value, 'top', event.clientY - 30 + 'px');
    this.renderer.setStyle(value, 'left', event.clientX - 15 + 'px');
    this.renderer.setProperty(value, 'innerHTML', '+10ms');

    this.renderer.appendChild(document.body, value);

    setTimeout(() => {
      this.renderer.setStyle(value, 'fontSize', '24px');
      this.renderer.setStyle(value, 'top', '20%');
      this.renderer.setStyle(value, 'opacity', '0');
    }, 10);

    setTimeout(() => {
      this.renderer.removeChild(document.body, value);
    }, 1000);
  };
  public clickHandler(event: MouseEvent) {
    if(!this.isAnimation){
      this.isAnimation = true;
    }
    this.time += 10;
    this.tap += 10;

    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }

    this.timeoutRef = setTimeout(() => {
      this.updateTime(this.tap);
      this.isAnimation = false;
    }, 2000);

    this.renderTap(event);

    if (this.btnEl) {
      if(this.isAnimation){
        this.btnEl.nativeElement.classList.remove('animate');
        void this.btnEl.nativeElement.offsetWidth;
        this.btnEl.nativeElement.classList.add('animate');
        
      }
    }
  }

  // Server req
  private updateTime(tap: number) {
    this.DataService.updateTime(tap).subscribe((response) => {
      this.time = response.time;
      this.tap = 0;
    });
  }

  private getTime() {
    this.DataService.getTime().subscribe((response) => {
      this.time = response.time;
    });
  }
}
