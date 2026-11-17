// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、時計（働く時間）と、決まりの印のチェック。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <circle cx="46" cy="50" r="30" fill="none" stroke="#fffdf7" stroke-width="6"/>
      <g stroke="#fffdf7" stroke-width="5" stroke-linecap="round"><line x1="46" y1="50" x2="46" y2="31"/><line x1="46" y1="50" x2="59" y2="57"/></g>
      <polyline points="60,70 70,80 90,56" fill="none" stroke="#f6d77a" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
