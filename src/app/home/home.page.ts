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

  public cellSize = 40;
  public gridLinesWidth: number = 1;
  public cellColors: string[] = [
    '#212121',
    '#2196F3',
    '#FF5722',
    '#4CAF50',
    '#FFC107',
    '#9C27B0',
    '#607D8B',
    '#E91E63',
  ];
  // cell, topleft, topcenter, topright, middleleft, middleright, bottomleft, bottomcenter, bottomright, new cell
  public ruleSet: string[] = [
    '000000',
    '000012',
    '000020',
    '000030',
    '000050',
    '000063',
    '000071',
    '000112',
    '000122',
    '000132',
    '000212',
    '000220',
    '000230',
    '000262',
    '000272',
    '000320',
    '000525',
    '000622',
    '000722',
    '001022',
    '001120',
    '002020',
    '002030',
    '002050',
    '002125',
    '002220',
    '002322',
    '005222',
    '012321',
    '012421',
    '012525',
    '012621',
    '012721',
    '012751',
    '014221',
    '014321',
    '014421',
    '014721',
    '016251',
    '017221',
    '017255',
    '017521',
    '017621',
    '017721',
    '025271',
    '100011',
    '100061',
    '100077',
    '100111',
    '100121',
    '100211',
    '100244',
    '100277',
    '100511',
    '101011',
    '101111',
    '101244',
    '101277',
    '102026',
    '102121',
    '102211',
    '102244',
    '102263',
    '102277',
    '102327',
    '102424',
    '102626',
    '102644',
    '102677',
    '102710',
    '102727',
    '105427',
    '111121',
    '111221',
    '111244',
    '111251',
    '111261',
    '111277',
    '111522',
    '112121',
    '112221',
    '112244',
    '112251',
    '112277',
    '112321',
    '112424',
    '112621',
    '112727',
    '113221',
    '122244',
    '122277',
    '122434',
    '122547',
    '123244',
    '123277',
    '124255',
    '124267',
    '125275',
    '200012',
    '200022',
    '200042',
    '200071',
    '200122',
    '200152',
    '200212',
    '200222',
    '200232',
    '200242',
    '200250',
    '200262',
    '200272',
    '200326',
    '200423',
    '200517',
    '200522',
    '200575',
    '200722',
    '201022',
    '201122',
    '201222',
    '201422',
    '201722',
    '202022',
    '202032',
    '202052',
    '202073',
    '202122',
    '202152',
    '202212',
    '202222',
    '202272',
    '202321',
    '202422',
    '202452',
    '202520',
    '202552',
    '202622',
    '202722',
    '203122',
    '203216',
    '203226',
    '203422',
    '204222',
    '205122',
    '205212',
    '205222',
    '205521',
    '205725',
    '206222',
    '206722',
    '207122',
    '207222',
    '207422',
    '207722',
    '211222',
    '211261',
    '212222',
    '212242',
    '212262',
    '212272',
    '214222',
    '215222',
    '216222',
    '217222',
    '222272',
    '222442',
    '222462',
    '222762',
    '222772',
    '300013',
    '300022',
    '300041',
    '300076',
    '300123',
    '300421',
    '300622',
    '301021',
    '301220',
    '302511',
    '401120',
    '401220',
    '401250',
    '402120',
    '402221',
    '402326',
    '402520',
    '403221',
    '500022',
    '500215',
    '500225',
    '500232',
    '500272',
    '500520',
    '502022',
    '502122',
    '502152',
    '502220',
    '502244',
    '502722',
    '512122',
    '512220',
    '512422',
    '512722',
    '600011',
    '600021',
    '602120',
    '612125',
    '612131',
    '612225',
    '700077',
    '701120',
    '701220',
    '701250',
    '702120',
    '702221',
    '702251',
    '702321',
    '702525',
    '702720',
  ];
  public clickedCellType: number = 0;
  public paused: boolean = false;

  ngOnInit() {}

  ngAfterViewInit() {
    const element = this.p5Canvas.nativeElement;
    new p5((p: any) => {
      p.setup = () => {
        this.init(p, element);
      };

      p.mousePressed = () => {
        this.updateCellOnClick(p);
      };

      p.keyPressed = () => {
        if (p.key >= '0' && p.key <= '9') {
          this.clickedCellType = parseInt(p.key);
        }
      };

      p.draw = () => {
        this.draw(p);
      };
    }, element);
  }

  debug() {
    this.cells = new Array(this.rows)
      .fill(null)
      .map(() => new Array(this.cols).fill(0));

    const yOff = 2;
    const xOff = 2;

    /* ----------- Red Borders ---------- */

    this.cells[yOff + 0][xOff + 1] = 2;
    this.cells[yOff + 0][xOff + 2] = 2;
    this.cells[yOff + 0][xOff + 3] = 2;
    this.cells[yOff + 0][xOff + 4] = 2;
    this.cells[yOff + 0][xOff + 5] = 2;
    this.cells[yOff + 0][xOff + 6] = 2;
    this.cells[yOff + 0][xOff + 7] = 2;
    this.cells[yOff + 0][xOff + 8] = 2;

    this.cells[yOff + 1][xOff + 9] = 2;
    this.cells[yOff + 2][xOff + 9] = 2;
    this.cells[yOff + 3][xOff + 9] = 2;
    this.cells[yOff + 4][xOff + 9] = 2;
    this.cells[yOff + 5][xOff + 9] = 2;
    this.cells[yOff + 6][xOff + 9] = 2;
    this.cells[yOff + 7][xOff + 9] = 2;

    this.cells[yOff + 7][xOff + 10] = 2;
    this.cells[yOff + 7][xOff + 11] = 2;
    this.cells[yOff + 7][xOff + 12] = 2;
    this.cells[yOff + 7][xOff + 13] = 2;

    this.cells[yOff + 8][xOff + 14] = 2;

    this.cells[yOff + 9][xOff + 13] = 2;
    this.cells[yOff + 9][xOff + 12] = 2;
    this.cells[yOff + 9][xOff + 11] = 2;
    this.cells[yOff + 9][xOff + 10] = 2;
    this.cells[yOff + 9][xOff + 9] = 2;
    this.cells[yOff + 9][xOff + 8] = 2;
    this.cells[yOff + 9][xOff + 7] = 2;
    this.cells[yOff + 9][xOff + 6] = 2;
    this.cells[yOff + 9][xOff + 5] = 2;
    this.cells[yOff + 9][xOff + 4] = 2;
    this.cells[yOff + 9][xOff + 3] = 2;
    this.cells[yOff + 9][xOff + 2] = 2;
    this.cells[yOff + 9][xOff + 1] = 2;

    this.cells[yOff + 8][xOff + 0] = 2;
    this.cells[yOff + 7][xOff + 0] = 2;
    this.cells[yOff + 6][xOff + 0] = 2;
    this.cells[yOff + 5][xOff + 0] = 2;
    this.cells[yOff + 4][xOff + 0] = 2;
    this.cells[yOff + 3][xOff + 0] = 2;
    this.cells[yOff + 2][xOff + 0] = 2;
    this.cells[yOff + 1][xOff + 0] = 2;

    this.cells[yOff + 2][xOff + 2] = 2;
    this.cells[yOff + 2][xOff + 3] = 2;
    this.cells[yOff + 2][xOff + 4] = 2;
    this.cells[yOff + 2][xOff + 5] = 2;
    this.cells[yOff + 2][xOff + 6] = 2;

    this.cells[yOff + 2][xOff + 7] = 2;
    this.cells[yOff + 3][xOff + 7] = 2;
    this.cells[yOff + 4][xOff + 7] = 2;
    this.cells[yOff + 5][xOff + 7] = 2;
    this.cells[yOff + 6][xOff + 7] = 2;

    this.cells[yOff + 7][xOff + 7] = 2;
    this.cells[yOff + 7][xOff + 6] = 2;
    this.cells[yOff + 7][xOff + 5] = 2;
    this.cells[yOff + 7][xOff + 4] = 2;
    this.cells[yOff + 7][xOff + 3] = 2;

    this.cells[yOff + 7][xOff + 2] = 2;
    this.cells[yOff + 6][xOff + 2] = 2;
    this.cells[yOff + 5][xOff + 2] = 2;
    this.cells[yOff + 4][xOff + 2] = 2;
    this.cells[yOff + 3][xOff + 2] = 2;

    /* ----------- Blue Cells ----------- */

    this.cells[yOff + 1][xOff + 1] = 1;
    this.cells[yOff + 1][xOff + 4] = 1;
    this.cells[yOff + 1][xOff + 7] = 1;
    this.cells[yOff + 4][xOff + 1] = 1;
    this.cells[yOff + 7][xOff + 1] = 1;
    this.cells[yOff + 8][xOff + 3] = 1;
    this.cells[yOff + 8][xOff + 6] = 1;

    this.cells[yOff + 8][xOff + 9] = 1;
    this.cells[yOff + 8][xOff + 10] = 1;
    this.cells[yOff + 8][xOff + 11] = 1;
    this.cells[yOff + 8][xOff + 12] = 1;
    this.cells[yOff + 8][xOff + 13] = 1;

    this.cells[yOff + 7][xOff + 8] = 1;
    this.cells[yOff + 6][xOff + 8] = 1;
    this.cells[yOff + 5][xOff + 8] = 1;
    this.cells[yOff + 4][xOff + 8] = 1;
    this.cells[yOff + 3][xOff + 8] = 1;

    /* ----- Turqoise (Purple) Cells ---- */

    this.cells[yOff + 1][xOff + 2] = 7;
    this.cells[yOff + 3][xOff + 1] = 7;
    this.cells[yOff + 6][xOff + 1] = 7;
    this.cells[yOff + 8][xOff + 2] = 7;
    this.cells[yOff + 8][xOff + 5] = 7;
    this.cells[yOff + 8][xOff + 8] = 7;

    /* ---------- Yellow Cells ---------- */

    this.cells[yOff + 1][xOff + 5] = 4;
    this.cells[yOff + 1][xOff + 8] = 4;
  }

  init(p: any, element: any) {
    this.cols = Math.floor(element.offsetWidth / this.cellSize);
    this.rows = Math.floor(element.offsetHeight / this.cellSize);
    p.createCanvas(this.cols * this.cellSize, this.rows * this.cellSize);
    p.frameRate(20);
    this.cells = new Array(this.rows)
      .fill(null)
      .map(() => new Array(this.cols).fill(0));
  }

  draw(p: any) {
    this.drawBackground(p);
    this.drawCells(p);
    if (!this.paused) {
      this.updateCells(p);
    }
  }

  drawBackground(p: any) {
    p.push();
    p.background(30);
    p.stroke(50);
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
          p.textSize(this.cellSize / 2);
          p.text(
            this.cells[j][i],
            i * this.cellSize + this.cellSize / 2 - this.cellSize / 6,
            j * this.cellSize + this.cellSize / 2 + this.cellSize / 6
          );
          p.pop();
        }
      }
    }
    p.pop();
  }

  updateCells(p: any) {
    const nextCells = new Array(this.rows)
      .fill(null)
      .map(() => new Array(this.cols).fill(0));
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        // for (let i = 0; i < 1; i++) {
        // for (let j = 0; j < 1; j++) {
        nextCells[j][i] = this.applyRuleSet(i, j);
      }
    }
    this.cells = nextCells;
  }

  applyRuleSet(x: number, y: number) {
    const cell = this.cells[y][x];
    let topLeft,
      topCenter,
      topRight,
      middleLeft,
      middleRight,
      bottomLeft,
      bottomCenter,
      bottomRight;

    if (y - 1 >= 0 && x - 1 >= 0) {
      topLeft = this.cells[y - 1][x - 1];
    } else {
      topLeft = this.cells[this.rows - 1][this.cols - 1];
    }
    if (y - 1 >= 0) {
      topCenter = this.cells[y - 1][x];
    } else {
      topCenter = this.cells[this.rows - 1][x];
    }
    if (y - 1 >= 0 && x + 1 < this.cols) {
      topRight = this.cells[y - 1][x + 1];
    } else {
      topRight = this.cells[this.rows - 1][0];
    }
    if (x - 1 >= 0) {
      middleLeft = this.cells[y][x - 1];
    } else {
      middleLeft = this.cells[y][this.cols - 1];
    }
    if (x + 1 < this.cols) {
      middleRight = this.cells[y][x + 1];
    } else {
      middleRight = this.cells[y][0];
    }
    if (y + 1 < this.rows && x - 1 >= 0) {
      bottomLeft = this.cells[y + 1][x - 1];
    } else {
      bottomLeft = this.cells[0][this.cols - 1];
    }
    if (y + 1 < this.rows) {
      bottomCenter = this.cells[y + 1][x];
    } else {
      bottomCenter = this.cells[0][x];
    }
    if (y + 1 < this.rows && x + 1 < this.cols) {
      bottomRight = this.cells[y + 1][x + 1];
    } else {
      bottomRight = this.cells[0][0];
    }

    // const condition = `${cell}${topLeft}${topCenter}${topRight}${middleLeft}${middleRight}${bottomLeft}${bottomCenter}${bottomRight}`;
    const condition = `${cell}${topCenter}${middleRight}${bottomCenter}${middleLeft}`;
    const foundRules = this.ruleSet.filter((rule) =>
      rule.startsWith(condition)
    );
    if (foundRules.length > 1) {
      console.log('Multiple rules found for condition: ', condition);
    }

    const rule = this.ruleSet.find((rule) => rule.startsWith(condition));
    if (rule) {
      const newCell = parseInt(rule[rule.length - 1]);
      return newCell;
    } else {
      return cell;
    }
  }

  updateCellOnClick(p: any) {
    const mouseX = p.mouseX;
    const mouseY = p.mouseY;
    const col = Math.floor(mouseX / this.cellSize);
    const row = Math.floor(mouseY / this.cellSize);
    if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
      this.cells[row][col] = this.clickedCellType;
    }
  }
}
