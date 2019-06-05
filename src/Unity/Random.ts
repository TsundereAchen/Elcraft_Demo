
/**
 * 随机值生成器
 */
class Random {
    private a: number;
    private b: number;
    private m: number;
    private x: number;

    public constructor(seed: number){
        let p = 2
        let q = 3
        this.a = 4 * p + 1
        this.b = 2 * q + 1
        this.m = 1048576
        this.x = seed
    }

    /**
     * 产生下一个随机值(整数)
     * @param min 随机范围最小值
     * @param max 随机范围最大值
     * @return 随机值
     */
    public nextInt(min: number, max: number): number {
        return Math.round(this.nextFloat(min, max));
    }

    /**
     * 产生下一个随机值(浮点数)
     * @param min 随机范围最小值
     * @param max 随机范围最大值
     * @return 随机值
    */
    public nextFloat(min: number, max: number): number {
        let x0 = this.x
        let x1 = this.a * x0 + this.b;
        // 取模
        this.x = x1 - Math.floor(x1 / this.m) * this.m;
        let r = max - min
        return min + (this.x / this.m * r)
    }
}