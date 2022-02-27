from rest_framework import exceptions  # type: ignore


class AccountActivationFailedException(exceptions.ParseError):
    pass
