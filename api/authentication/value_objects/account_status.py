import enum


class AccountStatus(enum.Enum):
    ACTIVE = 'Active'
    CLOSED = 'Closed'  # Personal data is not deleted
    DELETED = 'Deleted'
    UNDER_VERIFICATION = 'Under Verification'
