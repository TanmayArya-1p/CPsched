from cal.calendar import ICSCalendar, aggregate_contests

async def main():
    contests = await aggregate_contests()
    print(contests)
    ics_calendar = ICSCalendar(contests)
    ics_calendar.save("ics/contests.ics")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
