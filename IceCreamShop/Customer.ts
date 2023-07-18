namespace IceCreamShop {

    export class Customer extends Moveable {

        private id: number;
        public mood: Mood;
        public size: number;
        public isWaiting: Boolean;
        public waitingPos: number;
        private tablePosition: Vector;
        private hasTable: Boolean;
        private orderedIce: IceCream | null = null;
        private hasPaid: Boolean;

        public constructor(_id: number, _mood: Mood, _size: number,_isWaiting: Boolean, _waitingPos: number, _tablePosition: Vector, _hasTable: Boolean, _orderedIce: IceCream, _hasPaid: Boolean, _position?: Vector) {
            super(_position);

            if (_position)
                this.position = _position.copy();
            else
                this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(0, 200);

            this.id = _id;
            this.mood = _mood;    
            this.size = _size;  
            this.isWaiting = _isWaiting;                
            this.waitingPos = _waitingPos;          
            this.tablePosition = _tablePosition;  
            this.hasTable = _hasTable;         
            this.orderedIce = _orderedIce;       // Der Kunde hat anfangs noch nichts bestellt
            this.hasPaid = _hasPaid;
        }

        public draw(): void {
            let customer: Customer = this;

            if (customer.mood === Mood.Happy) {
                customer.drawGreenCustomer(customer.position);
            } else if (customer.mood === Mood.Unhappy) {
                customer.drawYelCustomer(customer.position);
            } else if (customer.mood === Mood.Angry) {
                customer.drawRedCustomer(customer.position);
            }

            this.arriveAtShop()
        }

        

        public drawGreenCustomer(_position: Vector): void {

            let canvas: HTMLCanvasElement = document.querySelector("canvas");
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
            let r: number = 30;

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

        public drawYelCustomer(_position: Vector): void {

            let canvas: HTMLCanvasElement = document.querySelector("canvas");
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
            let r: number = 30;

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

        public drawRedCustomer(_position: Vector): void {

            let canvas: HTMLCanvasElement = document.querySelector("canvas");
            let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
            let r: number = 30;

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


        public arriveAtShop(): void {

            let entrancePosition: Vector = new Vector(145, 600);
            this.moveCustomerToTarget(entrancePosition);

            this.isWaiting = true;

            if (this.checkTable()) {
                this.goToTable();
            } else {
                setTimeout(() => {
                    this.mood = Mood.Unhappy;
                }, 5000);

                setTimeout(() => {
                    this.mood = Mood.Angry;
                }, 12000); 

                this.isWaiting = false;
            }
        }
       
        
        public findWaitingPosition(): void {
            let entrancePosition: Vector = new Vector(0, 0); 
            let waitingCustomers: Customer[] = customers.filter((customer) => customer.isWaiting);
            let minDistanceBetweenCustomers: number = 30;
            let waitingX: number = entrancePosition.x;
            if (waitingCustomers.length > 0) {
                let lastWaitingCustomer: Customer = waitingCustomers[waitingCustomers.length - 1];
                waitingX = lastWaitingCustomer.position.x + minDistanceBetweenCustomers;
            }
        
            
            this.position.x = waitingX;
            this.position.y = entrancePosition.y; 
        }


        public checkTable(): boolean {
            
            let availableTables = sitPositions.filter(tablePos => {
               
                return customers.some(customer => customer.hasTable && customer.tablePosition.equals(tablePos));
            });
    
           
            return availableTables.length === 0;
        }
        
        public goToTable(): void {
           
            let availableTables = sitPositions.filter((tablePos) => {
              
              return customers.some(
                (customer) => customer.hasTable && customer.tablePosition.equals(tablePos)
              );
            });
        
           
            if (availableTables.length > 0) {
              
              const targetTable = availableTables[0];
        
             
              this.moveCustomerToTarget(targetTable);
              this.orderIceCream();
            } else {
              console.log("Kein Tisch verfügbar.");
            }
          }

        private orderIceCream(): void {
            
            this.drawSpeechBubble();
        
            // 5 Sekunden warten und Mood auf Unhappy ändern
            setTimeout(() => {
              this.mood = Mood.Unhappy;
              this.draw();
            }, 5000);
        
            // 7 Sekunden warten und Mood auf Angry ändern
            setTimeout(() => {
              this.mood = Mood.Angry;
              this.draw();
            }, 12000);
          }

          public drawSpeechBubble(): void {
            crc2.save();
            crc2.beginPath();
            crc2.translate(this.position.x, this.position.y);
            crc2.moveTo(200, 150);
            crc2.ellipse(110, 110, 60, 50, 0, 0, -1.8 * Math.PI, true);
            crc2.lineTo(200, 150);
            crc2.closePath();

            crc2.fillStyle = "hsl(100, 100%, 100%)";
            crc2.fill();
            crc2.strokeStyle = "hsl(0, 0%, 0%)";
            crc2.lineWidth = 2;
            crc2.lineCap = "round";
            crc2.stroke();
            crc2.restore();

            this.orderedIce.changePos(this.position.x - 110 * 1.3, this.position.y - (110 * 2.6));
            this.orderedIce.draw();

        }
        
        
        public checkDroppedIceCream(clickedIceCream: IceCream): boolean {
            
            return this.orderedIce === clickedIceCream;
          }
        
        public payIce(): void {
            this.hasPaid = true;
        }
      

        public leaveShop(): void {
            let index = customers.indexOf(this);
            if (index > -1) {
                customers.splice(index, 1);
            }
        }
     

        public moveCustomerToTarget(_targetPosition: Vector): void {
            this.setTargetPosition(_targetPosition);
            this.velocity = new Vector(1, 1);
            this.velocity.scale(3);// Hier kannst du die Geschwindigkeit anpassen
        }
       
        
    }
   
    




}
