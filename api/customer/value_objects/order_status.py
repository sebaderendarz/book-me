import enum


class OrderStatus(enum.Enum):
    NEW = 'New'
    CONFIRMED = 'Confirmed'
    CLOSED = 'Closed'
