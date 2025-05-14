class GridRenderer {
    constructor(canvas, width = 800, height = 600) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.gridSize = { x: 20, y: 15 }; // チェッカーボードの分割数
        
        // キャンバスのサイズを設定
        this.canvas.width = width;
        this.canvas.height = height;
    }

    // チェッカーボードの描画
    drawGrid(distortionModel = null, isDistorted = false, opacity = 1.0) {
        this.ctx.save();
        
        const cellWidth = this.width / this.gridSize.x;
        const cellHeight = this.height / this.gridSize.y;
        
        // 色の設定
        const colors = isDistorted ? 
            [`rgba(232, 240, 255, ${opacity})`, `rgba(208, 224, 255, ${opacity})`] : // 歪み後（青系）
            [`rgba(248, 248, 248, ${opacity})`, `rgba(224, 224, 224, ${opacity})`];  // 歪み前（グレー系）

        // チェッカーボードパターンの描画
        for (let i = 0; i < this.gridSize.x; i++) {
            for (let j = 0; j < this.gridSize.y; j++) {
                const colorIndex = (i + j) % 2;
                this.drawCell(
                    i * cellWidth,
                    j * cellHeight,
                    cellWidth,
                    cellHeight,
                    colors[colorIndex],
                    distortionModel,
                    isDistorted
                );
            }
        }
        
        this.ctx.restore();
    }

    // セルの描画
    drawCell(x, y, width, height, color, distortionModel, isDistorted) {
        this.ctx.beginPath();

        // セルの4つの頂点を生成
        const corners = [
            { x: x, y: y },                       // 左上
            { x: x + width, y: y },               // 右上
            { x: x + width, y: y + height },      // 右下
            { x: x, y: y + height }               // 左下
        ];

        // 歪み変換を適用（必要な場合）
        const transformedCorners = corners.map(point => {
            if (isDistorted && distortionModel) {
                const distorted = distortionModel.distortPoint(point.x, point.y);
                return { x: distorted.x, y: distorted.y };
            }
            return point;
        });

        // パスを描画
        this.ctx.moveTo(transformedCorners[0].x, transformedCorners[0].y);
        for (let i = 1; i < transformedCorners.length; i++) {
            this.ctx.lineTo(transformedCorners[i].x, transformedCorners[i].y);
        }
        this.ctx.closePath();

        // セルを塗りつぶし
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    // キャンバスのクリア
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}
