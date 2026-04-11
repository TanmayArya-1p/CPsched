import Services.cf as codeforces
import Services.codechef as codechef
import Services.lc as leetcode
from Services.schema import Contest
import datetime
from ics import Calendar, Event
from .consts import PLATFORM_URL_MAP
from .utils import parse_to_arrow

async def aggregate_contests():
	cf_contests = await codeforces.contests()
	cc_contests = await codechef.contests()
	lc_contests = await leetcode.contests()
	return cf_contests + cc_contests + lc_contests


class ICSCalendar:
	def __init__(self,contests):
		self.calendar = self.__produce_calendar(contests)


	def __extract_events(self, contests: list[Contest]):
		res = []
		for i in contests:
			e = Event()
			e.name = i.platform + ": " + i.title
			e.begin = parse_to_arrow(i.start_time)
			e.end = parse_to_arrow(i.start_time + datetime.timedelta(seconds=i.duration))
			e.url = PLATFORM_URL_MAP[i.platform]
			res.append(e)
		return res

	def __produce_calendar(self,contests):
		c = Calendar()
		events = self.__extract_events(contests)
		for ev in events:
			c.events.add(ev)

		return c

	def save(self,path):
		with open(path, 'w') as icsf:
			icsf.writelines(self.calendar.serialize_iter())
