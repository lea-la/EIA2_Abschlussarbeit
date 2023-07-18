var IceCreamShop;
(function (IceCreamShop) {
    class IceCream {
        constructor(_x, _y, _iceName, _iceSize, _iceFlavor, _iceCoat, _iceTopping, _icePrice, _size) {
            this.x = _x;
            this.y = _y;
            this.iceName = _iceName;
            this.iceSize = _iceSize;
            this.iceFlavor = _iceFlavor;
            this.iceCoat = _iceCoat;
            this.iceTopping = _iceTopping;
            this.icePrice = _icePrice;
        }
        draw() {
            this.size = parseInt(this.iceSize, 10);
            this.drawStick();
            this.drawFlavor();
            this.drawCoat();
            this.drawTopping();
        }
        drawTopping() {
            IceCreamShop.crc2.save();
            IceCreamShop.crc2.beginPath();
            IceCreamShop.crc2.translate(this.x, this.y);
            IceCreamShop.crc2.scale(this.size, this.size);
            IceCreamShop.crc2.closePath();
            IceCreamShop.crc2.fillStyle = this.iceTopping;
            IceCreamShop.crc2.fillRect(10, 40, 5, 15);
            IceCreamShop.crc2.strokeStyle = "hsl(0, 0%, 0%)";
            IceCreamShop.crc2.lineWidth = 1;
            IceCreamShop.crc2.strokeRect(10, 40, 5, 15);
            IceCreamShop.crc2.restore();
            IceCreamShop.crc2.save();
            IceCreamShop.crc2.beginPath();
            IceCreamShop.crc2.translate(this.x, this.y);
            IceCreamShop.crc2.scale(this.size, this.size);
            IceCreamShop.crc2.closePath();
            IceCreamShop.crc2.fillStyle = this.iceTopping;
            IceCreamShop.crc2.fillRect(15, 10, 5, 15);
            IceCreamShop.crc2.strokeStyle = "hsl(0, 0%, 0%)";
            IceCreamShop.crc2.lineWidth = 1;
            IceCreamShop.crc2.strokeRect(15, 10, 5, 15);
            IceCreamShop.crc2.restore();
            IceCreamShop.crc2.save();
            IceCreamShop.crc2.beginPath();
            IceCreamShop.crc2.translate(this.x, this.y);
            IceCreamShop.crc2.scale(this.size, this.size);
            IceCreamShop.crc2.closePath();
            IceCreamShop.crc2.fillStyle = this.iceTopping;
            IceCreamShop.crc2.fillRect(30, 30, 5, 15);
            IceCreamShop.crc2.strokeStyle = "hsl(0, 0%, 0%)";
            IceCreamShop.crc2.lineWidth = 1;
            IceCreamShop.crc2.strokeRect(30, 30, 5, 15);
            IceCreamShop.crc2.restore();
        }
        drawStick() {
            IceCreamShop.crc2.save();
            IceCreamShop.crc2.beginPath();
            IceCreamShop.crc2.translate(this.x, this.y);
            IceCreamShop.crc2.scale(this.size, this.size);
            IceCreamShop.crc2.moveTo(25, 40);
            IceCreamShop.crc2.lineTo(25, 100);
            IceCreamShop.crc2.strokeStyle = "hsl(33, 41%, 53%)";
            IceCreamShop.crc2.lineWidth = 7;
            IceCreamShop.crc2.lineCap = "round";
            IceCreamShop.crc2.stroke();
            IceCreamShop.crc2.restore();
        }
        ;
        drawFlavor() {
            IceCreamShop.crc2.save();
            IceCreamShop.crc2.beginPath();
            IceCreamShop.crc2.translate(this.x, this.y);
            IceCreamShop.crc2.scale(this.size, this.size);
            IceCreamShop.crc2.moveTo(25, 70);
            IceCreamShop.crc2.bezierCurveTo(5, 70, 10, 70, 10, 15);
            IceCreamShop.crc2.bezierCurveTo(8, 10, 15, 10, 25, 5);
            IceCreamShop.crc2.bezierCurveTo(40, 10, 35, 10, 42, 15);
            IceCreamShop.crc2.bezierCurveTo(40, 70, 45, 70, 25, 70);
            IceCreamShop.crc2.closePath();
            IceCreamShop.crc2.fillStyle = this.iceFlavor;
            IceCreamShop.crc2.fill();
            IceCreamShop.crc2.strokeStyle = "hsl(0, 0%, 0%)";
            IceCreamShop.crc2.lineWidth = 1;
            IceCreamShop.crc2.lineCap = "round";
            IceCreamShop.crc2.stroke();
            IceCreamShop.crc2.restore();
        }
        ;
        drawCoat() {
            //Coat
            IceCreamShop.crc2.save();
            IceCreamShop.crc2.beginPath();
            IceCreamShop.crc2.translate(this.x, this.y);
            IceCreamShop.crc2.scale(this.size, this.size);
            IceCreamShop.crc2.moveTo(25, 60);
            IceCreamShop.crc2.bezierCurveTo(0, 70, 5, 70, 5, 15);
            IceCreamShop.crc2.bezierCurveTo(6, 5, 7, 4, 25, 0);
            IceCreamShop.crc2.bezierCurveTo(40, 5, 41, 4, 42, 15);
            IceCreamShop.crc2.bezierCurveTo(45, 65, 50, 65, 25, 60);
            IceCreamShop.crc2.closePath();
            IceCreamShop.crc2.fillStyle = this.iceCoat;
            IceCreamShop.crc2.fill();
            IceCreamShop.crc2.strokeStyle = "hsl(0, 0%, 0%)";
            IceCreamShop.crc2.lineWidth = 1;
            IceCreamShop.crc2.lineCap = "round";
            IceCreamShop.crc2.stroke();
            IceCreamShop.crc2.restore();
        }
        ;
        changePos(_posX, _posY) {
            this.x = _posX;
            this.y = _posY;
        }
    }
    IceCreamShop.IceCream = IceCream;
})(IceCreamShop || (IceCreamShop = {}));
//# sourceMappingURL=IceCream.js.map