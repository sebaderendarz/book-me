import enum


class OrderStatus(enum.Enum):
    BOOKED = 'Booked'
    CONFIRMED = 'Confirmed'
    CLOSED = 'Closed'
