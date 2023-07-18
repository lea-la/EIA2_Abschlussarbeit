namespace IceCreamShop {

    export class Vector {
       public  x: number;
       public  y: number;
    
        public constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }
    
        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }
    
        public scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }
    
        public equals(other: Vector): boolean {
            return this.x === other.x && this.y === other.y;
        }
        
        public add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    
        public subtract(_subtrahend: Vector): void {
            this.x -= _subtrahend.x;
            this.y -= _subtrahend.y;
        }
    
        public normalize(): void {
            const length: number = this.getLength();
            if (length !== 0) {
                this.scale(1 / length);
            }
        }
    
        public getLength(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    
        public distanceTo(_target: Vector): number {
            const diffX: number = this.x - _target.x;
            const diffY: number = this.y - _target.y;
            return Math.sqrt(diffX * diffX + diffY * diffY);
        }
        public random(_minLength: number, _maxLength: number): void {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = 3;
    
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }

        public copy(): Vector {
            return new Vector(this.x, this.y);
        }
    }
    
}
