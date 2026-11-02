/* Bumabagsak na sakura petals — idinadagdag sa lahat ng pages */
(function () {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var cv = document.createElement("canvas");
    cv.id = "sakura-petals";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);

    var ctx = cv.getContext("2d");
    var W, H, petals = [];

    function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
    addEventListener("resize", resize);
    resize();

    function make(init) {
        return {
            x: Math.random() * W,
            y: init ? Math.random() * H : -20,
            size: Math.random() * 6 + 5,
            vy: Math.random() * 0.6 + 0.35,
            vx: Math.random() * 0.5 - 0.1,
            rot: Math.random() * 6.28,
            vr: Math.random() * 0.02 - 0.01,
            sway: Math.random() * 6.28
        };
    }

    var count = Math.min(26, Math.floor(innerWidth / 45));
    for (var i = 0; i < count; i++) petals.push(make(true));

    function draw() {
        ctx.clearRect(0, 0, W, H);
        petals.forEach(function (p) {
            p.y += p.vy;
            p.sway += 0.015;
            p.x += p.vx + Math.sin(p.sway) * 0.5;
            p.rot += p.vr;
            if (p.y > H + 20 || p.x > W + 20) Object.assign(p, make(false));

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = "rgba(255,140,220,.75)";
            ctx.shadowColor = "rgba(255,100,210,.9)";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, 6.28);
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();
