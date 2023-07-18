namespace IceCreamShop {

        export abstract class Moveable {
          public position: Vector;
          public velocity: Vector;
          protected targetPosition: Vector;
      
          protected constructor(_position?: Vector) {
            if (_position) {
              this.position = _position.copy();
            } else {
              this.position = new Vector(0, 0);
            }
              this.velocity = new Vector(0, 0);
          }
      
          public move(_timeslice: number): void {
            let offset: Vector = this.targetPosition.copy();
            offset.subtract(this.position);
      
            //Entfernung in x- und y-Richtung
            let distanceX = offset.x * this.velocity.x * _timeslice;
            let distanceY = offset.y * this.velocity.y * _timeslice;
      
            this.position.x += distanceX;
            this.position.y += distanceY;
          }
          
          public setTargetPosition(_targetPosition: Vector): void {
            this.targetPosition = _targetPosition;
          }
      
          
          public setVelocity(_velocity: Vector): void {
            this.velocity = _velocity;
          }
      
          public abstract draw(): void;
        }
      }