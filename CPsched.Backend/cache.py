import Services.cf as codeforces
import Services.codechef as codechef
import Services.lc as leetcode
from Services.schema import Contest,CODECHEF,CODEFORCES,LEETCODE
import redis.asyncio as redis
import json
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()

REDIS_HOST = os.environ["REDIS_HOST"]
REDIS_PORT = int(os.environ["REDIS_PORT"])
REDIS_PASSWORD = os.environ["REDIS_PASSWORD"]
REDIS_CACHE_EXPIRE = int(os.environ["REDIS_CACHE_EXPIRE"])

redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    decode_responses=True
)

async def lc_contests():
    global redis_client
    
    cache_key = "lc_contests"
    cached_data = await redis_client.get(cache_key)
    if cached_data:
        return json.loads(cached_data)
    
    data = await leetcode.contests()
    data = Contest.contest_list_json(data)
    await redis_client.set(cache_key, json.dumps(data), ex=REDIS_CACHE_EXPIRE)
    return data

async def cf_contests():
    global redis_client

    
    cache_key = "cf_contests"
    cached_data = await redis_client.get(cache_key)
    if cached_data:
        return json.loads(cached_data)
    
    data = await codeforces.contests()
    data = Contest.contest_list_json(data)
    await redis_client.set(cache_key, json.dumps(data), ex=REDIS_CACHE_EXPIRE)
    return data

async def cc_contests():
    global redis_client

    
    cache_key = "cc_contests"
    cached_data = await redis_client.get(cache_key)
    if cached_data:
        return json.loads(cached_data)
    
    data = await codechef.contests()
    data = Contest.contest_list_json(data)
    await redis_client.set(cache_key, json.dumps(data), ex=REDIS_CACHE_EXPIRE)
    return data

async def cached_contests(*args):
    callmap = {CODEFORCES : cf_contests, LEETCODE : lc_contests, CODECHEF : cc_contests}
    data = []
    for i in args:
        if i not in callmap:
            raise ValueError(f"Invalid platform: {i}")
        data += await callmap[i]()
    data = sorted(data, key=lambda x: x["start_time"])
    return data

