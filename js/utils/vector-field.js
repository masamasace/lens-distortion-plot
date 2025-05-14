class VectorFieldRenderer {
    constructor(canvas, width = 800, height = 600) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.density = { x: 40, y: 30 }; // ベクトル場の密度
        
        // キャンバスのサイズを設定
        this.canvas.width = width;
        this.canvas.height = height;
    }

    // ベクトル場の描画
    drawVectorField(distortionModel) {
        if (!distortionModel) return;

        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(64, 128, 255, 0.7)';
        this.ctx.fillStyle = 'rgba(64, 128, 255, 0.9)';
        
        const stepX = this.width / this.density.x;
        const stepY = this.height / this.density.y;
        
        // 各点でのベクトルを描画
        for (let x = 0; x <= this.width; x += stepX) {
            for (let y = 0; y <= this.height; y += stepY) {
                const distorted = distortionModel.distortPoint(x, y);
                this.drawVector(x, y, distorted.dx, distorted.dy);
            }
        }
        
        this.ctx.restore();
    }

    // 単一のベクトルを描画
    drawVector(x, y, dx, dy) {
        const scale = 1.0; // ベクトルの表示スケール
        const minLength = 2; // 表示する最小ベクトル長
        
        const length = Math.sqrt(dx * dx + dy * dy);
        if (length < minLength / scale) return;
        
        const scaledDx = dx * scale;
        const scaledDy = dy * scale;
        
        // ベクトルの線を描画
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + scaledDx, y + scaledDy);
        this.ctx.stroke();
        
        // ベクトルの矢印を描画
        const arrowLength = Math.min(6, length * scale * 0.3);
        const angle = Math.atan2(scaledDy, scaledDx);
        const arrowAngle = Math.PI / 6; // 30度
        
        this.ctx.beginPath();
        this.ctx.moveTo(x + scaledDx, y + scaledDy);
        this.ctx.lineTo(
            x + scaledDx - arrowLength * Math.cos(angle - arrowAngle),
            y + scaledDy - arrowLength * Math.sin(angle - arrowAngle)
        );
        this.ctx.lineTo(
            x + scaledDx - arrowLength * Math.cos(angle + arrowAngle),
            y + scaledDy - arrowLength * Math.sin(angle + arrowAngle)
        );
        this.ctx.closePath();
        this.ctx.fill();
    }

    // キャンバスのクリア
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}
