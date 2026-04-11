import arrow
from cal.consts import DAY_CODES, TMZ


def parse_to_arrow(dt):
	return arrow.get(dt).to(TMZ)
