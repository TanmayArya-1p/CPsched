from selenium import webdriver 
from bs4 import BeautifulSoup
from datetime import datetime,timedelta
import pytz
from selenium.webdriver.chrome.options import Options
from .schema import Contest , LEETCODE
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)


CONTEST_DURATION = 90 * 60

def epoch_time(day_time_str):
    day_time_str = " ".join(day_time_str.split(" ")[:-1])
    date_format = "%A %I:%M %p"
    dt_naive = datetime.strptime(day_time_str, date_format)
    now = datetime.now()
    dt_with_date = dt_naive.replace(year=now.year, month=now.month, day=now.day)
    while dt_with_date.strftime('%A') != day_time_str.split()[0]:
        dt_with_date += timedelta(days=1)
    tz = pytz.timezone('Asia/Kolkata')
    dt_aware = tz.localize(dt_with_date)
    return dt_aware




async def contests():
    driver = webdriver.Chrome(options=chrome_options)
    driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
        'source': '''
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
            window.navigator.chrome = {
                runtime: {},
                // Add more properties if needed
            };
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en']
            });
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5]
            });
        '''
    })
    driver.execute_cdp_cmd('Network.setUserAgentOverride', {
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
    })
    driver.get("https://leetcode.com/contest/")
    sp = BeautifulSoup(driver.page_source, 'html.parser')
    contest_links = sp.find_all('a', href=lambda href: href and href.startswith('/contest/'))
    filtered_links = list(filter(lambda i: not("ended" in i.text.lower()) and len(i.find_all("div" , recursive=False)) == 2  , contest_links))
    driver.close()
    otpt = []
    for i in filtered_links:
        inner = i.text
        title = i.find("span").text
        pos = inner.index(title)
        date = inner[pos+len(title):]
        otpt.append(Contest(title,epoch_time(date),CONTEST_DURATION,LEETCODE))
    return otpt

if(__name__ == "__main__"):
    print(contests())