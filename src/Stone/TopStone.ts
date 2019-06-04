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
		stone.type=1;
		this.BottomCenter(stone,s,x,y);
		return stone;
	}

	/**
	 * 初始化默认居中位置 
	 */
	private BottomCenter(stone: Stone,s: egret.DisplayObject,x: number,y : number):void{
		var mapHight = s.stage.stageWidth;
        var mapwight = s.stage.stageHeight;
        var hight = stone.image.height;
        var wight = stone.image.width; 
		stone.X = x;
		stone.Y = y;
		stone.image.x = x;
		stone.image.y = y;
	}

}