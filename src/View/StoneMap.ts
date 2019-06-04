class StoneMap extends eui.Component {
	/**舞台的宽 */
	private stageW:number;
	/**舞台的高 */
	private stageH:number;
	/**纹理本身的高度 */
	private textureHeight:number;
	/**图片引用 */
	private stoneArr:egret.Bitmap;

	public constructor(){
		super();
	  	this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	
	/**初始化 */
	public onAddToStage(){
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		this.stageH=this.stage.stageWidth;
		this.stageW=this.stage.stageHeight;
		var texture:egret.Texture = RES.getRes("GameScene_png"); 
		//保留原始纹理的高度
		this.textureHeight=texture.textureHeight;
		var res:egret.Bitmap = new egret.Bitmap();
		res.texture = texture;
		this.stoneArr = res;
		this.addChild(res);	
	}

}