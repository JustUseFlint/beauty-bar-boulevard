import asyncio, sys, json
from playwright.async_api import async_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8811/beauty-bar-boulevard/'
OUT = sys.argv[2] if len(sys.argv) > 2 else '/workspace/beauty-bar/shots/'
DPR = float(sys.argv[3]) if len(sys.argv) > 3 else 2
PAGES = ['', 'services/', 'plan/', 'looks/', 'team/', 'visit/', '404.html']
VPS = [('m', 393, 852, DPR), ('d', 1440, 900, 1)]
async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        res = []
        for tag, w, h, dpr in VPS:
            ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=dpr, is_mobile=(tag == 'm'), has_touch=(tag == 'm'))
            for pg in PAGES:
                page = await ctx.new_page(); errs = []
                page.on('console', lambda m, e=errs: e.append(m.text) if m.type == 'error' else None)
                page.on('pageerror', lambda x, e=errs: e.append('PAGEERR ' + str(x)))
                page.on('requestfailed', lambda r, e=errs: e.append('REQFAIL ' + r.url))
                r = await page.goto(BASE + pg, wait_until='networkidle')
                await page.wait_for_timeout(1500)
                H = await page.evaluate('document.documentElement.scrollHeight')
                y = 0
                while y < H:
                    y += 500; await page.evaluate(f'window.scrollTo(0,{y})'); await page.wait_for_timeout(120)
                    H = await page.evaluate('document.documentElement.scrollHeight')
                await page.wait_for_timeout(1200)
                ov = await page.evaluate('[document.documentElement.scrollWidth, window.innerWidth, [...document.querySelectorAll("body *")].filter(e=>{const r=e.getBoundingClientRect();return r.right>window.innerWidth+1 && getComputedStyle(e).position!=="fixed" && !e.closest(".mq,.reel-track,.ftr-wm,.story-track,.iris,.sheet,.peek,.tray,.toast")}).slice(0,5).map(e=>e.className||e.tagName)]')
                await page.evaluate('window.scrollTo(0,0)'); await page.wait_for_timeout(1500)
                name = (pg.strip('/').replace('.html', '') or 'home')
                await page.screenshot(path=f'{OUT}{name}-{tag}.png', full_page=False)
                await page.screenshot(path=f'{OUT}{name}-{tag}-full.png', full_page=True)
                res.append({'page': pg or '/', 'vp': tag, 'status': r.status if r else None, 'errs': errs, 'overflow': ov})
                await page.close()
            await ctx.close()
        await b.close()
        for x in res: print(json.dumps(x))
asyncio.run(run())
