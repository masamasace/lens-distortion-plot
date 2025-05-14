class BrownConradyModel {
    constructor() {
        this.params = {
            f: 1000,    // 焦点距離
            cx: 400,    // 主点x座標
            cy: 300,    // 主点y座標
            b1: 0,      // アフィン変換係数
            b2: 0,      // 非直交性係数
            k1: 0.1,    // 放射歪曲係数
            k2: 0,      // 放射歪曲係数
            k3: 0,      // 放射歪曲係数
            k4: 0,      // 放射歪曲係数
            p1: 0,      // 接線歪曲係数
            p2: 0       // 接線歪曲係数
        };
    }

    // パラメータの更新
    updateParams(newParams) {
        Object.assign(this.params, newParams);
    }

    // 規格化座標系での歪み計算
    computeDistortion(x, y) {
        const r2 = x * x + y * y;
        const r4 = r2 * r2;
        const r6 = r4 * r2;
        const r8 = r6 * r2;

        // 放射歪曲の計算
        const radialFactor = 1 + 
            this.params.k1 * r2 + 
            this.params.k2 * r4 + 
            this.params.k3 * r6 + 
            this.params.k4 * r8;

        // 接線歪曲の計算
        const dx_tangential = 2 * this.params.p1 * x * y + this.params.p2 * (r2 + 2 * x * x);
        const dy_tangential = this.params.p1 * (r2 + 2 * y * y) + 2 * this.params.p2 * x * y;

        // アフィン・非直交変換の計算
        const dx_affine = this.params.b1 * x + this.params.b2 * y;
        const dy_affine = 0;

        // 総合的な歪み
        const x_distorted = x * radialFactor + dx_tangential + dx_affine;
        const y_distorted = y * radialFactor + dy_tangential + dy_affine;

        return {
            x: x_distorted,
            y: y_distorted,
            dx: x_distorted - x,
            dy: y_distorted - y
        };
    }

    // ピクセル座標系での歪み計算
    distortPoint(px, py) {
        // ピクセル座標から規格化座標への変換
        const x = (px - this.params.cx) / this.params.f;
        const y = (py - this.params.cy) / this.params.f;

        // 歪みの計算
        const distorted = this.computeDistortion(x, y);

        // 規格化座標からピクセル座標への逆変換
        return {
            x: distorted.x * this.params.f + this.params.cx,
            y: distorted.y * this.params.f + this.params.cy,
            dx: distorted.dx * this.params.f,
            dy: distorted.dy * this.params.f
        };
    }
}
