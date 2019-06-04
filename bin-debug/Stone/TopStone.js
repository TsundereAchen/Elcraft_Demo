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
 * 最顶上石块
 */
var TopStone = (function (_super) {
    __extends(TopStone, _super);
    function TopStone() {
        return _super.call(this) || this;
    }
    /**
     * 创建最上方的石块
     */
    TopStone.prototype.init = function (s, x, y) {
        var stone = new Stone();
        var stoneImg = new egret.Bitmap(RES.getRes("stone1_png"));
        stone.image = stoneImg;
        stone.type = 1;
        this.BottomCenter(stone, s, x, y);
        return stone;
    };
    /**
     * 初始化默认居中位置
     */
    TopStone.prototype.BottomCenter = function (stone, s, x, y) {
        var mapHight = s.stage.stageWidth;
        var mapwight = s.stage.stageHeight;
        var hight = stone.image.height;
        var wight = stone.image.width;
        stone.X = x;
        stone.Y = y;
        stone.image.x = x;
        stone.image.y = y;
    };
    return TopStone;
}(egret.DisplayObjectContainer));
__reflect(TopStone.prototype, "TopStone");
//# sourceMappingURL=TopStone.js.map