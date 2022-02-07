from django.core import exceptions


class PasswordLengthValidator:
    """Validate whether password is between 8 and 30 characters length."""

    def validate(self, password, user=None):
        error_message = "Provide password that is between 8 and 30 characters length."
        if password != None:
            if len(password) < 8 or len(password) > 30:
                raise exceptions.ValidationError(error_message)

        else:
            raise exceptions.ValidationError(error_message)
        return password

    def get_help_text(self):
        return "Your password must be between 8 and 30 characters length."
