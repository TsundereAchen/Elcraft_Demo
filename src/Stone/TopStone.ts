/**
 * 最顶上石块
 */
class TopStone extends  egret.DisplayObjectContainer {
	public constructor() {
		super();
	}
	/**
	 * 创建最上方的石块
	 */
	public init(s: egret.DisplayObjectContainer,x: number,y : number):Stone{
		var stone:Stone = new Stone();
		var stoneImg = new egret.Bitmap(RES.getRes("stone1_png"));
		stone.image = stoneImg;
		stone.type=2;
		this.BottomCenter(stone,s,x,y);
		return stone;
	}

	/**
	 * 初始化默认居中位置 
	 */
	private BottomCenter(stone: Stone,s: egret.DisplayObject,x: number,y : number):void{
		stone.X = x;
		stone.Y = y;
		stone.image.x = x;
		stone.image.y = y;
	}

	//更换石块
	public replaceImg(s: egret.DisplayObjectContainer,x: number,y : number,num: number): Stone{
		var stone:Stone = new Stone();
		var stoneImg = new egret.Bitmap(RES.getRes("stone"+num+"_png"));
		stone.image = stoneImg;
		stone.type=2;
		stone.X = x;
		stone.Y = y;
		stone.image.x = x;
		stone.image.y = y;
		return stone;
	}
}