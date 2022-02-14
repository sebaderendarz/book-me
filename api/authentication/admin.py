from django.contrib import admin, auth

User = auth.get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
