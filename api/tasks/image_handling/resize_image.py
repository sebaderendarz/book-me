from tasks import celery


@celery.app.task
def resize_image_at_path() -> None:
    print('test_me')
