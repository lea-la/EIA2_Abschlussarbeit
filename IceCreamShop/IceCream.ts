namespace IceCreamShop {

  export class IceCream {

    public x: number;
    public y: number;
    public iceName: string;
    public iceSize: string;
    public iceFlavor: string;
    public iceCoat: string;
    public iceTopping: string;
    public icePrice: number;
    public size: number


    public constructor(_x: number, _y: number, _iceName: string, _iceSize: string, _iceFlavor: string, _iceCoat: string, _iceTopping: string,
      _icePrice: number, _size: number) {

      this.x = _x;
      this.y = _y;
      this.iceName = _iceName;
      this.iceSize = _iceSize;
      this.iceFlavor = _iceFlavor;
      this.iceCoat = _iceCoat;
      this.iceTopping = _iceTopping;
      this.icePrice = _icePrice;

    }
    public draw(): void {

      this.size = parseInt(this.iceSize, 10);

    
      this.drawStick();
      this.drawFlavor();
      this.drawCoat();
      this.drawTopping();


    }

    public drawTopping() {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      crc2.closePath();
      crc2.fillStyle = this.iceTopping;
      crc2.fillRect(10, 40, 5, 15);
      crc2.strokeStyle = "hsl(0, 0%, 0%)";
      crc2.lineWidth = 1;
      crc2.strokeRect(10, 40, 5, 15);
      crc2.restore();

      crc2.save();
      crc2.beginPath();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      crc2.closePath();
      crc2.fillStyle = this.iceTopping;
      crc2.fillRect(15, 10, 5, 15);
      crc2.strokeStyle = "hsl(0, 0%, 0%)";
      crc2.lineWidth = 1;
      crc2.strokeRect(15, 10, 5, 15);
      crc2.restore();
      
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      crc2.closePath();
      crc2.fillStyle = this.iceTopping;
      crc2.fillRect(30, 30, 5, 15);
      crc2.strokeStyle = "hsl(0, 0%, 0%)";
      crc2.lineWidth = 1;
      crc2.strokeRect(30, 30, 5, 15);
      crc2.restore();
    }


    public drawStick() {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      crc2.moveTo(25, 40);
      crc2.lineTo(25, 100);
      crc2.strokeStyle = "hsl(33, 41%, 53%)";
      crc2.lineWidth = 7;
      crc2.lineCap = "round";
      crc2.stroke();
      crc2.restore();

      

    };
    public drawFlavor() {
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      crc2.moveTo(25, 70);
      crc2.bezierCurveTo(5, 70, 10, 70, 10, 15);
      crc2.bezierCurveTo(8, 10, 15, 10, 25, 5);
      crc2.bezierCurveTo(40, 10, 35, 10, 42, 15);
      crc2.bezierCurveTo(40, 70, 45, 70, 25, 70);
      crc2.closePath();
      crc2.fillStyle = this.iceFlavor;
      crc2.fill();
      crc2.strokeStyle = "hsl(0, 0%, 0%)";
      crc2.lineWidth = 1;
      crc2.lineCap = "round";
      crc2.stroke();
      crc2.restore();

    };
    public drawCoat() {
      //Coat
      crc2.save();
      crc2.beginPath();
      crc2.translate(this.x, this.y);
      crc2.scale(this.size, this.size);
      crc2.moveTo(25, 60);
      crc2.bezierCurveTo(0, 70, 5, 70, 5, 15);
      crc2.bezierCurveTo(6, 5, 7, 4, 25, 0);
      crc2.bezierCurveTo(40, 5, 41, 4, 42, 15);
      crc2.bezierCurveTo(45, 65, 50, 65, 25, 60);
      crc2.closePath();
      crc2.fillStyle = this.iceCoat;
      crc2.fill();
      crc2.strokeStyle = "hsl(0, 0%, 0%)";
      crc2.lineWidth = 1;
      crc2.lineCap = "round";
      crc2.stroke();
      crc2.restore();
    };


    public changePos(_posX: number, _posY: number): void {
      this.x = _posX;
      this.y = _posY;
    }
  }
}
