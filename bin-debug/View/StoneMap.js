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
var StoneMap = (function (_super) {
    __extends(StoneMap, _super);
    function StoneMap() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    /**初始化 */
    StoneMap.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stageH = this.stage.stageWidth;
        this.stageW = this.stage.stageHeight;
        var texture = RES.getRes("GameScene_png");
        //保留原始纹理的高度
        this.textureHeight = texture.textureHeight;
        var res = new egret.Bitmap();
        res.texture = texture;
        this.stoneArr = res;
        this.addChild(res);
    };
    return StoneMap;
}(eui.Component));
__reflect(StoneMap.prototype, "StoneMap");
//# sourceMappingURL=StoneMap.js.map