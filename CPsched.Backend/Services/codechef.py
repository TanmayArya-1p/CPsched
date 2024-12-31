import requests
from selenium import webdriver 
from .schema import Contest, CODECHEF 
import time
from datetime import datetime
from selenium.webdriver.chrome.options import Options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)

def epoch_time(time_str):
    dt = datetime.fromisoformat(time_str)
    return dt


def fetch_contests(ses):
    url = "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"
    payload = {}
    headers = {
    'accept': 'application/json, text/plain, */*',
    'cookie': ses,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return(response.json())



async def contests():
    driver = webdriver.Chrome(options=chrome_options)
    driver.get("https://www.codechef.com/contests")
    sescookie = ""
    try:
        time.sleep(5)
        sescookie = (driver.get_cookies()[-1]['name'])
        upcont = (fetch_contests(sescookie))['future_contests']
        otpt = []
        for i in upcont:
            otpt.append(Contest(i['contest_name'],epoch_time(i['contest_start_date_iso']),60*int(i['contest_duration']),CODECHEF))
        return otpt
    finally:
        driver.quit()


if(__name__ == "__main__"):
    print(contests())