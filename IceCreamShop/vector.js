var IceCreamShop;
(function (IceCreamShop) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        equals(other) {
            return this.x === other.x && this.y === other.y;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        subtract(_subtrahend) {
            this.x -= _subtrahend.x;
            this.y -= _subtrahend.y;
        }
        normalize() {
            const length = this.getLength();
            if (length !== 0) {
                this.scale(1 / length);
            }
        }
        getLength() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        distanceTo(_target) {
            const diffX = this.x - _target.x;
            const diffY = this.y - _target.y;
            return Math.sqrt(diffX * diffX + diffY * diffY);
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = 3;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    IceCreamShop.Vector = Vector;
})(IceCreamShop || (IceCreamShop = {}));
//# sourceMappingURL=vector.js.map