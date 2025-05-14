class DistortionViewer {
    constructor() {
        // キャンバスの取得と初期化
        this.gridCanvas = document.getElementById('gridCanvas');
        this.vectorCanvas = document.getElementById('vectorCanvas');
        
        // レンダラーの初期化
        this.gridRenderer = new GridRenderer(this.gridCanvas);
        this.vectorRenderer = new VectorFieldRenderer(this.vectorCanvas);
        
        // モデルの初期化
        this.model = new BrownConradyModel();
        
        // 表示設定
        this.showVectorField = true;
        this.correctedOpacity = 0.5;
    }

    // 表示の更新
    update() {
        // グリッドのクリア
        this.gridRenderer.clear();
        
        // 歪み補正前のグリッドを描画
        this.gridRenderer.drawGrid(null, false, 1.0);
        
        // 歪み補正後のグリッドを描画
        this.gridRenderer.drawGrid(this.model, true, this.correctedOpacity);
        
        // ベクトル場の更新
        this.vectorRenderer.clear();
        if (this.showVectorField) {
            this.vectorRenderer.drawVectorField(this.model);
        }
    }

    // パラメータの更新
    updateParams(params) {
        this.model.updateParams(params);
        this.update();
    }

    // ベクトル場の表示/非表示切り替え
    setVectorFieldVisibility(visible) {
        this.showVectorField = visible;
        this.update();
    }

    // ベクトル場の表示倍率設定
    setVectorScale(scale) {
        this.vectorRenderer.setScale(scale);
        this.update();
    }

    // 補正後グリッドの透明度設定
    setCorrectedOpacity(opacity) {
        this.correctedOpacity = opacity;
        this.update();
    }
}
