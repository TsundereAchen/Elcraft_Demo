var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 底部的石块
 */
var BottomStone = (function (_super) {
    __extends(BottomStone, _super);
    function BottomStone() {
        return _super.call(this) || this;
    }
    /**
     * 初始化石块
     */
    BottomStone.prototype.init = function () {
    };
    return BottomStone;
}(egret.DisplayObjectContainer));
__reflect(BottomStone.prototype, "BottomStone");
//# sourceMappingURL=BottomStone.js.map