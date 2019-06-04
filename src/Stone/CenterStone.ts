/**
 * 中部的石头
 */
class CenterStone extends  egret.DisplayObjectContainer {
	public constructor() {
		super();
	}

	/**
	 * 创建石块
	 */
	public init(s: egret.DisplayObjectContainer,x: number,y: number):Stone{
		var stoneImage = new egret.Bitmap(RES.getRes("stone1_png"));
		var stoneIndex;
		var stone: Stone = new Stone();
		stone.image = stoneImage;
		stoneImage.touchEnabled = true;
		stone.X = x;
		stone.Y = y;
		stone.image.x = x;
		stone.image.y = y;
		return stone;
	}

	public 
}