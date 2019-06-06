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
		stone.image.touchEnabled = true;
		return stone;
	}

	
	public replaceImg(s: egret.DisplayObjectContainer,x: number,y : number,num: number): Stone{
		var stone:Stone = new Stone();
		var stoneImg = new egret.Bitmap(RES.getRes("stone"+num+"_png"));
		stone.image = stoneImg;
		stone.type=2;
		stoneImg.touchEnabled = true;
		stone.X = x;
		stone.Y = y;
		stone.image.x = x;
		stone.image.y = y;
		return stone;
	}
	
	//更换石块类型
	public replaceStone(stone: Stone): Stone{
		var stone1:Stone = new Stone();
		stone1.image = stone.image;
		return stone1;
	}
}