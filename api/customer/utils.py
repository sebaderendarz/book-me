from shortuuid import ShortUUID


def generate_short_uuid() -> str:
    '''Generate 8 length uuid.'''
    return ShortUUID().random(length=8).upper()
