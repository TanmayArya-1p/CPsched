import chromedriver_autoinstaller
from fastapi import FastAPI
from Services.schema import CODECHEF,CODEFORCES,LEETCODE
from cache import lc_contests,cf_contests,cc_contests,cached_contests  


app = FastAPI()

@app.get("/contests")
async def contests():
    return await cached_contests(CODEFORCES,CODECHEF,LEETCODE)

@app.on_event("startup")
async def startup():
    chromedriver_autoinstaller.install()