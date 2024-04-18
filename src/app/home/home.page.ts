import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('p5Canvas', { static: true }) p5Canvas: ElementRef;

  private debugMode: boolean = true;

  private cells: number[][];
  private cols: number = 0;
  private rows: number = 0;

  public cellSize = 30;
  public gridLinesWidth: number = 2;
  public cellColors: string[] = [
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFFFFF',
  ];
  // cell, topleft, topcenter, topright, middleleft, middleright, bottomleft, bottomcenter, bottomright, new cell
  public ruleSet: String[] = ['2000100003'];

  ngOnInit() {}

  ngAfterViewInit() {
    const element = this.p5Canvas.nativeElement;
    new p5((p: any) => {
      p.setup = () => {
        this.init(p, element);
        console.debug(`this.cells:`, this.cells);
      };

      // p.windowResized = () => {
      //   this.init(p, element);
      // };

      p.draw = () => {
        this.draw(p);
      };
    }, element);
  }

  init(p: any, element: any) {
    this.cols = Math.floor(element.offsetWidth / this.cellSize);
    this.rows = Math.floor(element.offsetHeight / this.cellSize);
    p.createCanvas(this.cols * this.cellSize, this.rows * this.cellSize);
    this.cells = new Array(this.rows)
      .fill(null)
      .map(() => new Array(this.cols).fill(0));
    this.debug(p);
  }

  debug(p: any) {
    for (let i = 1; i < 8; i++) {
      const x = Math.floor(p.random(this.cols));
      const y = Math.floor(p.random(this.rows));
      this.cells[y][x] = i;
    }
  }

  draw(p: any) {
    this.drawBackground(p);
    this.drawCells(p);
  }

  drawBackground(p: any) {
    p.push();
    p.background(30);
    p.stroke(100);
    p.strokeWeight(this.gridLinesWidth);
    for (let i = 0; i <= this.cols; i++) {
      let x = i * this.cellSize;
      p.line(x, 0, x, p.height);
    }
    for (let j = 0; j <= this.rows; j++) {
      let y = j * this.cellSize;
      p.line(0, y, p.width, y);
    }
    p.pop();
  }

  drawCells(p: any) {
    p.push();
    p.noStroke();
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        p.fill(this.cellColors[this.cells[j][i]]);
        p.rect(
          i * this.cellSize + this.gridLinesWidth / 2,
          j * this.cellSize + this.gridLinesWidth / 2,
          this.cellSize - this.gridLinesWidth,
          this.cellSize - this.gridLinesWidth
        );
        if (this.debugMode) {
          if (this.cells[j][i] == 0) continue;
          p.push();
          p.stroke(255);
          p.strokeWeight(2);
          p.fill(0);
          p.textSize(10);
          p.text(
            this.cells[j][i],
            i * this.cellSize + this.cellSize / 2 - 3,
            j * this.cellSize + this.cellSize / 2 + 3
          );
          p.pop();
        }
      }
    }
    p.pop();
  }
}
