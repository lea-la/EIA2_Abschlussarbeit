var IceCreamShop;
(function (IceCreamShop) {
    class Moveable {
        constructor(_position) {
            if (_position) {
                this.position = _position.copy();
            }
            else {
                this.position = new IceCreamShop.Vector(0, 0);
            }
            this.velocity = new IceCreamShop.Vector(0, 0);
        }
        move(_timeslice) {
            let offset = this.targetPosition.copy();
            offset.subtract(this.position);
            //Entfernung in x- und y-Richtung
            let distanceX = offset.x * this.velocity.x * _timeslice;
            let distanceY = offset.y * this.velocity.y * _timeslice;
            this.position.x += distanceX;
            this.position.y += distanceY;
        }
        setTargetPosition(_targetPosition) {
            this.targetPosition = _targetPosition;
        }
        setVelocity(_velocity) {
            this.velocity = _velocity;
        }
    }
    IceCreamShop.Moveable = Moveable;
})(IceCreamShop || (IceCreamShop = {}));
//# sourceMappingURL=Moveable.js.map