//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

  
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    } 

    private textfield: egret.TextField;

     /**@private*/

     /**游戏背景 */
     private sm: StoneMap;

     /**最顶上石快集合 */
     private topStone: Stone[] = [];

     /**中部石块集合 */
     private centerStone: Stone[] = [];

     /**底部石块集合 */
     private bottomStone: Stone[][] = [];

     /** */

      /**
     * 创建场景界面
     * Create scene interface
     */
    protected  createGameScene(): void {
       this.start();
    }

    /**开始游戏 */
    private start():void{
        //初始化背景
        this.sm = new StoneMap();
        this.addChild(this.sm);

        //初始化顶上的石块
        var top1 = new TopStone();
        var stone = top1.init(this,300,50);
        this.addChild(stone.image);
        this.topStone.push(stone); 
        stone = top1.init(this,380,50);
        this.addChild(stone.image);
        this.topStone.push(stone); 

        //初始化中间的石块
        var top2 = new CenterStone();
        stone = top2.init(this,300,230);
        this.addChild(stone.image);
        this.centerStone.push(stone);
        stone = top2.init(this,380,230);
        //stone.image = new egret.Bitmap(RES.getRes("stone2_png"));
        this.addChild(stone.image); 
        this.centerStone.push(stone);

        //初始化底下的石块
        for(var i = 0;i < 7;++i){
            this.bottomStone[i]=[];
            for(var j = 0;j<6;++j){
                this.bottomStone[i] = new Array<Stone>();
            }
        }

        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.StoneChangeHandle,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StoneChangeHandle,this);

        this.centerStone[0].image.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.StoneMoveHandle,this);
		this.centerStone[0].image.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.StoneMoveHandle,this);

        this.centerStone[1].image.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.StoneMoveHandle,this);
		this.centerStone[1].image.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.StoneMoveHandle,this);

    }

    /**
	 * 石块变形处理(53~286)
	 */
	private StoneChangeHandle(e: egret.TouchEvent): void{
        console.warn("------变性-----");

		var stone1:Stone = this.centerStone[0];
		if(stone1.image==null) return;
		var stone2:Stone = this.centerStone[1];
     
        //this.centerStone = [];

		var height1 = stone1.X;
		var wight1 = stone1.Y;
		var height2 = stone2.X;
		var wight2 = stone2.Y;
	
    	//石块在同一水平线上
		if(wight1==wight2){
           //stone1在左边
            if(height1<height2){
                stone1.X=height2;
                stone1.Y=wight2-80;
                stone1.image.x=height2;
                stone1.image.y=wight2-80;
            }else{
                stone2.X=height1;
                stone2.Y=wight1-80;
                stone2.image.x=height1;
                stone2.image.y=wight1-80;
            }
			
		}
        //第一个石块在下面
        else if(wight1>wight2){
            stone1.X=height2-80;
            stone1.Y=wight2+80;
            stone1.image.x=height2-80;
            stone1.image.y=wight2+80;

            stone2.Y=wight1;
            stone2.image.y=wight1;
        }
        //第一个石块在上面
        else if(wight1<wight2){
            stone2.X=height1-80;
            stone2.Y=wight1+80;
            stone2.image.x=height1-80;
            stone2.image.y=wight1+80;

            stone1.Y=wight2;
            stone1.image.y=wight2;
        }
        this.addChild(stone1.image);
        this.centerStone.push(stone1);
        this.addChild(stone2.image);
        this.centerStone.push(stone2);
	}

    /**
     * 石块下滑处理
     */
    private StoneMoveHandle(e: egret.TouchEvent): void{
         //this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.StoneChangeHandle,this);
        console.warn("-----下滑------");
        //底部石块更新
        this.BottomUpdata();
        //中部石块更新
        this.centerUpdata();
        //顶部石块更新
        this.TopUpdata();

		//this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StoneChangeHandle,this);

    }

    /**
     * 最顶上石块更新
     */
    private TopUpdata():void {
        var num = this.topStone[0].type+1;
        this.topStone = [];
        var top1 = new TopStone();
        var random = new Random(10);
    
        var stone = top1.replaceImg(this,300,50,random.nextInt(1,num));   
        this.topStone.push(stone); 
        this.addChild(stone.image);
        stone = top1.replaceImg(this,380,50,random.nextInt(1,num));
        this.topStone.push(stone); 
        this.addChild(stone.image);
    }


    /**
     * 中部石块更新
     */
    private centerUpdata(): void{
     
        // this.removeChild(this.centerStone[0].image);
        // this.removeChild(this.centerStone[1].image);

        var stone1:Stone = new Stone();
		//if(stone1.image==null) return;
        var stone2:Stone = new Stone();
        
       // this.centerStone = [];

		var height1 = this.topStone[0].X;
		var wight1 = this.topStone[0].Y;
		var height2 = this.topStone[1].X;
		var wight2 = this.topStone[1].Y;

        stone1.X=height1;
        stone1.Y=wight1+170;
        stone1.image = this.topStone[0].image;
        stone1.image.x=height1;
        stone1.image.y=wight1+170;


        stone2.X=height2;
        stone2.Y=wight2+170;
        stone2.image = this.topStone[1].image;
        stone2.image.x=height2;
        stone2.image.y=wight2+170;

        this.addChild(stone1.image);
        this.centerStone[0]=stone1;
        this.addChild(stone2.image);
        this.centerStone[1]=stone2;
    }

    /**
     * 底部石块更新
     */
    private BottomUpdata(): void{
        var stone1:Stone= new Stone();
		//if(stone1.image==null) return;
        var stone2:Stone = new Stone();

        //保证stone1在下方
        if(this.centerStone[0].Y>this.centerStone[1].Y || this.centerStone[0].X<this.centerStone[1].X)
        {
            var height1 = this.centerStone[0].X;
            var wight1 = this.centerStone[0].Y;
            var height2 = this.centerStone[1].X;
            var wight2 = this.centerStone[1].Y;
        }
        else
        {
            var height1 = this.centerStone[1].X;
            var wight1 = this.centerStone[1].Y;
            var height2 = this.centerStone[0].X;
            var wight2 = this.centerStone[0].Y;
        }
      

        //同一列
        if(height1==height2){
          
           for(var i = 1;i < 7;++i){
               if(this.bottomStone[i][wight1]==null){
                    stone1.X = height1;
                    var img1 = this.centerStone[0].image;
                    stone1.image = img1;
                    stone1.image.x = height1;
                    stone1.Y=(i+1)*80+270;
                    stone1.image.y=(i+1)*80+270;
                    this.bottomStone[i][height1] = stone1;
                    this.addChild(stone1.image);
                    
                    stone2.X = height2;
                    img1 = this.centerStone[1].image;
                    stone2.image = img1;
                    stone2.image.x = height2;
                    stone2.Y = (i)*80+270;
                    stone2.image.y = (i)*80+270;
                    this.bottomStone[i-1][height2] = stone2;
                    this.addChild(stone2.image);
               }else{
                   break;
               }

           }
        }
        //同一行
        else{
            for(var i = 0;i < 7;++i){
                if(this.bottomStone[i][wight1]==null){
                    stone1.X =  height1;
                    stone1.image = this.centerStone[0].image;
                    stone1.image.x = height1;
                    stone1.Y = (i+1)*80+270;
                    stone1.image.y = (i+1)*80+270;
                    this.bottomStone[i][height1]=stone1;      
                    this.addChild(stone1.image);
                }
                if(this.bottomStone[i][wight2]==null){
                    stone2.X = height1;
                    stone2.image = this.centerStone[1].image;
                    stone2.image.x = height2;
                    stone2.Y = (i+1)*80+270;
                    stone2.image.y = (i+1)*80+270;
                    this.bottomStone[i][height2]=stone2;       
                    this.addChild(stone2.image);
                }
            }
        } 
    }

    /**
     * 检测消除
     */
    private checkEliminate(): void{

    }
}
