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
 * 中部的石头
 */
var CenterStone = (function (_super) {
    __extends(CenterStone, _super);
    function CenterStone() {
        return _super.call(this) || this;
    }
    /**
     * 创建石块
     */
    CenterStone.prototype.init = function (s, x, y) {
        var stoneImage = new egret.Bitmap(RES.getRes("stone1_png"));
        var stoneIndex;
        var stone = new Stone();
        stone.image = stoneImage;
        stoneImage.touchEnabled = true;
        stone.X = x;
        stone.Y = y;
        stone.image.x = x;
        stone.image.y = y;
        return stone;
    };
    CenterStone.prototype.replaceImg = function (s, x, y, num) {
        var stone = new Stone();
        var stoneImg = new egret.Bitmap(RES.getRes("stone" + num + "_png"));
        stone.image = stoneImg;
        stone.type = 2;
        stoneImg.touchEnabled = true;
        stone.X = x;
        stone.Y = y;
        stone.image.x = x;
        stone.image.y = y;
        return stone;
    };
    CenterStone.prototype.replaceStone = function (stone) {
        var stone1 = new Stone();
        stone1.image = stone.image;
        return stone1;
    };
    return CenterStone;
}(egret.DisplayObjectContainer));
__reflect(CenterStone.prototype, "CenterStone");
//# sourceMappingURL=CenterStone.js.map