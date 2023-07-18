var IceCreamShop;
(function (IceCreamShop) {
    class Customer extends IceCreamShop.Moveable {
        constructor(_id, _mood, _size, _isWaiting, _waitingPos, _tablePosition, _hasTable, _orderedIce, _hasPaid, _position) {
            super(_position);
            this.orderedIce = null;
            if (_position)
                this.position = _position.copy();
            else
                this.position = new IceCreamShop.Vector(0, 0);
            this.velocity = new IceCreamShop.Vector(0, 0);
            this.velocity.random(0, 200);
            this.id = _id;
            this.mood = _mood;
            this.size = _size;
            this.isWaiting = _isWaiting;
            this.waitingPos = _waitingPos;
            this.tablePosition = _tablePosition;
            this.hasTable = _hasTable;
            this.orderedIce = _orderedIce; // Der Kunde hat anfangs noch nichts bestellt
            this.hasPaid = _hasPaid;
        }
        draw() {
            let customer = this;
            if (customer.mood === IceCreamShop.Mood.Happy) {
                customer.drawGreenCustomer(customer.position);
            }
            else if (customer.mood === IceCreamShop.Mood.Unhappy) {
                customer.drawYelCustomer(customer.position);
            }
            else if (customer.mood === IceCreamShop.Mood.Angry) {
                customer.drawRedCustomer(customer.position);
            }
            this.arriveAtShop();
        }
        drawGreenCustomer(_position) {
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            let r = 30;
            //Kopf
            crc2.save();
            crc2.translate(_position.x, _position.y);
            crc2.fillStyle = "hsl(125, 31%, 64%)";
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 4;
            crc2.beginPath();
            crc2.arc(30, 30, r, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.fill();
            crc2.closePath();
            crc2.restore();
            //Mund
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            //crc2.scale(this.size, this.size);
            crc2.moveTo(15, 40);
            crc2.bezierCurveTo(15, 40, 30, 50, 45, 40);
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 4;
            crc2.lineCap = "round";
            crc2.stroke();
            crc2.restore();
            //Auge
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            //crc2.scale(this.size, this.size);
            crc2.arc(40, 20, 5, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.restore();
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            crc2.arc(20, 20, 5, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.restore();
        }
        drawYelCustomer(_position) {
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            let r = 30;
            //Kopf
            crc2.save();
            crc2.translate(_position.x, _position.y);
            crc2.fillStyle = "hsl(53, 60%, 64%)";
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 4;
            crc2.beginPath();
            crc2.arc(30, 30, r, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.fill();
            crc2.closePath();
            crc2.restore();
            //Mund
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            //crc2.scale(this.size, this.size);
            crc2.moveTo(15, 40);
            crc2.lineTo(45, 40);
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 4;
            crc2.lineCap = "round";
            crc2.stroke();
            crc2.restore();
            //Auge
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            //crc2.scale(this.size, this.size);
            crc2.arc(40, 20, 5, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.restore();
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            crc2.arc(20, 20, 5, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.restore();
        }
        drawRedCustomer(_position) {
            let canvas = document.querySelector("canvas");
            let crc2 = canvas.getContext("2d");
            let r = 30;
            //Kopf
            crc2.save();
            crc2.translate(_position.x, _position.y);
            crc2.fillStyle = "hsl(0, 60%, 59%)";
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 4;
            crc2.beginPath();
            crc2.arc(30, 30, r, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.fill();
            crc2.closePath();
            crc2.restore();
            //Mund
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            //crc2.scale(this.size, this.size);
            crc2.moveTo(15, 40);
            crc2.bezierCurveTo(15, 40, 30, 30, 45, 40);
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 4;
            crc2.lineCap = "round";
            crc2.stroke();
            crc2.restore();
            //Augenbrauen
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            //crc2.scale(this.size, this.size);
            crc2.moveTo(20, 10);
            crc2.lineTo(27, 15);
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.restore();
            //Augenbrauen
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            //crc2.scale(this.size, this.size);
            crc2.moveTo(33, 15);
            crc2.lineTo(40, 10);
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.restore();
            //Auge
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            //crc2.scale(this.size, this.size);
            crc2.arc(40, 20, 5, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.restore();
            crc2.save();
            crc2.beginPath();
            crc2.translate(_position.x, _position.y);
            crc2.arc(20, 20, 5, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.restore();
        }
        arriveAtShop() {
            let entrancePosition = new IceCreamShop.Vector(145, 600);
            this.moveCustomerToTarget(entrancePosition);
            this.isWaiting = true;
            if (this.checkTable()) {
                this.goToTable();
            }
            else {
                setTimeout(() => {
                    this.mood = IceCreamShop.Mood.Unhappy;
                }, 5000);
                setTimeout(() => {
                    this.mood = IceCreamShop.Mood.Angry;
                }, 12000);
                this.isWaiting = false;
            }
        }
        findWaitingPosition() {
            let entrancePosition = new IceCreamShop.Vector(0, 0);
            let waitingCustomers = IceCreamShop.customers.filter((customer) => customer.isWaiting);
            let minDistanceBetweenCustomers = 30;
            let waitingX = entrancePosition.x;
            if (waitingCustomers.length > 0) {
                let lastWaitingCustomer = waitingCustomers[waitingCustomers.length - 1];
                waitingX = lastWaitingCustomer.position.x + minDistanceBetweenCustomers;
            }
            this.position.x = waitingX;
            this.position.y = entrancePosition.y;
        }
        checkTable() {
            let availableTables = IceCreamShop.sitPositions.filter(tablePos => {
                return IceCreamShop.customers.some(customer => customer.hasTable && customer.tablePosition.equals(tablePos));
            });
            return availableTables.length === 0;
        }
        goToTable() {
            let availableTables = IceCreamShop.sitPositions.filter((tablePos) => {
                return IceCreamShop.customers.some((customer) => customer.hasTable && customer.tablePosition.equals(tablePos));
            });
            if (availableTables.length > 0) {
                const targetTable = availableTables[0];
                this.moveCustomerToTarget(targetTable);
                this.orderIceCream();
            }
            else {
                console.log("Kein Tisch verfügbar.");
            }
        }
        orderIceCream() {
            this.drawSpeechBubble();
            // 5 Sekunden warten und Mood auf Unhappy ändern
            setTimeout(() => {
                this.mood = IceCreamShop.Mood.Unhappy;
                this.draw();
            }, 5000);
            // 7 Sekunden warten und Mood auf Angry ändern
            setTimeout(() => {
                this.mood = IceCreamShop.Mood.Angry;
                this.draw();
            }, 12000);
        }
        drawSpeechBubble() {
            IceCreamShop.crc2.save();
            IceCreamShop.crc2.beginPath();
            IceCreamShop.crc2.translate(this.position.x, this.position.y);
            IceCreamShop.crc2.moveTo(200, 150);
            IceCreamShop.crc2.ellipse(110, 110, 60, 50, 0, 0, -1.8 * Math.PI, true);
            IceCreamShop.crc2.lineTo(200, 150);
            IceCreamShop.crc2.closePath();
            IceCreamShop.crc2.fillStyle = "hsl(100, 100%, 100%)";
            IceCreamShop.crc2.fill();
            IceCreamShop.crc2.strokeStyle = "hsl(0, 0%, 0%)";
            IceCreamShop.crc2.lineWidth = 2;
            IceCreamShop.crc2.lineCap = "round";
            IceCreamShop.crc2.stroke();
            IceCreamShop.crc2.restore();
            this.orderedIce.changePos(this.position.x - 110 * 1.3, this.position.y - (110 * 2.6));
            this.orderedIce.draw();
        }
        checkDroppedIceCream(clickedIceCream) {
            return this.orderedIce === clickedIceCream;
        }
        payIce() {
            this.hasPaid = true;
        }
        leaveShop() {
            let index = IceCreamShop.customers.indexOf(this);
            if (index > -1) {
                IceCreamShop.customers.splice(index, 1);
            }
        }
        moveCustomerToTarget(_targetPosition) {
            this.setTargetPosition(_targetPosition);
            this.velocity = new IceCreamShop.Vector(1, 1);
            this.velocity.scale(3); // Hier kannst du die Geschwindigkeit anpassen
        }
    }
    IceCreamShop.Customer = Customer;
})(IceCreamShop || (IceCreamShop = {}));
//# sourceMappingURL=Customer.js.map