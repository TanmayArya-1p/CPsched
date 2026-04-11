from time import sleep
import time
from selenium import webdriver
from bs4 import BeautifulSoup
import pytz
from dateutil import parser
from selenium.webdriver.chrome.options import Options
from .schema import Contest , LEETCODE
import shutil
import selenium
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)


CONTEST_DURATION = 90 * 60
TMZ = "Asia/Kolkata"
WAIT_UNTIL_XPATH = "//a[starts-with(@href, '/contest/')]"
PAGE_WAIT_TIME = 10

def epoch_time(day_time_str):
    dt_naive = parser.parse(day_time_str, fuzzy=True, ignoretz=True)
    tz = pytz.timezone(TMZ)
    dt_aware = tz.localize(dt_naive)
    return dt_aware


async def contests():
    try:
        driver = webdriver.Chrome(options=chrome_options)
    except selenium.common.exceptions.NoSuchDriverException:
        chromedriver_path = shutil.which("chromedriver")
        service = webdriver.ChromeService(executable_path=chromedriver_path)
        driver = webdriver.Chrome(options=chrome_options, service=service)

    #driver = webdriver.Chrome(options=chrome_options)
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

    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH, WAIT_UNTIL_XPATH))
        )
        time.sleep(PAGE_WAIT_TIME)
    except:
        pass

    sp = BeautifulSoup(driver.page_source, 'html.parser')
    contest_links = sp.find_all('a', href=lambda href: href and href.startswith('/contest/'))
    filtered_links = list(filter(lambda i: not("ended" in i.text.lower()) and len(i.parent.find_all("p" , recursive=True)) == 2  , contest_links))
    driver.close()
    otpt = []
    for i in filtered_links:
        parent = i.parent
        title = parent.find("p", recursive=True).text
        date = parent.find_all("p", recursive=True)[1].text
        otpt.append(Contest(title,epoch_time(date),CONTEST_DURATION,LEETCODE))
    return otpt

if(__name__ == "__main__"):
    print(contests())
