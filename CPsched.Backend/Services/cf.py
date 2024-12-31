import requests
from .schema import Contest, CODEFORCES 
from datetime import datetime

async def contests():
    data = requests.get("https://codeforces.com/api/contest.list").json()["result"]
    upcoming_contests = []
    for i in data:
        if(i["phase"] == "BEFORE"):
            upcoming_contests.append(Contest(i["name"],datetime.fromtimestamp(i["startTimeSeconds"]),i["durationSeconds"],CODEFORCES))
        else:
            break
    return upcoming_contests


if(__name__ == "__main__"):
    print(contests())