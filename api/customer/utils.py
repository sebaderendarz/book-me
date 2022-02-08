from shortuuid import ShortUUID  # type: ignore


def generate_short_uuid() -> str:
    '''Generate 8 length uuid.'''
    return ShortUUID().random(length=8).upper()
