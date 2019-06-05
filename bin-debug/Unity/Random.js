var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 随机值生成器
 */
var Random = (function () {
    function Random(seed) {
        var p = 2;
        var q = 3;
        this.a = 4 * p + 1;
        this.b = 2 * q + 1;
        this.m = 1048576;
        this.x = seed;
    }
    /**
     * 产生下一个随机值(整数)
     * @param min 随机范围最小值
     * @param max 随机范围最大值
     * @return 随机值
     */
    Random.prototype.nextInt = function (min, max) {
        return Math.round(this.nextFloat(min, max));
    };
    /**
     * 产生下一个随机值(浮点数)
     * @param min 随机范围最小值
     * @param max 随机范围最大值
     * @return 随机值
    */
    Random.prototype.nextFloat = function (min, max) {
        var x0 = this.x;
        var x1 = this.a * x0 + this.b;
        // 取模
        this.x = x1 - Math.floor(x1 / this.m) * this.m;
        var r = max - min;
        return min + (this.x / this.m * r);
    };
    return Random;
}());
__reflect(Random.prototype, "Random");
//# sourceMappingURL=Random.js.map