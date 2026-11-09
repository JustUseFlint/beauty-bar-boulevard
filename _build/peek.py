import asyncio, sys
from playwright.async_api import async_playwright
BASE=sys.argv[1]; pages=sys.argv[2].split(','); vp=sys.argv[3]; stops=[float(x) for x in sys.argv[4].split(',')]
async def run():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        m = vp=='m'
        ctx=await b.new_context(viewport={'width':393,'height':852} if m else {'width':1440,'height':900}, device_scale_factor=1, is_mobile=m, has_touch=m)
        for pg in pages:
            page=await ctx.new_page(); errs=[]
            page.on('console', lambda x,e=errs: e.append(x.text) if x.type=='error' else None)
            page.on('pageerror', lambda x,e=errs: e.append(str(x)))
            await page.goto(BASE+pg, wait_until='networkidle'); await page.wait_for_timeout(2600)
            H=await page.evaluate('document.documentElement.scrollHeight')
            for i,s in enumerate(stops):
                y=int(s*(H-(852 if m else 900))) if s<=1 else int(s)
                await page.evaluate(f'window.scrollTo(0,{y})'); await page.wait_for_timeout(1700)
                name=(pg.strip('/') or 'home').replace('.html','')
                await page.screenshot(path=f'/tmp/pk-{name}-{vp}-{i}.png')
            print(pg, H, errs)
            await page.close()
        await b.close()
asyncio.run(run())
