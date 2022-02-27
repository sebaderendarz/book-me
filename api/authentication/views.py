from django import urls
from django.contrib import auth
from django.utils.translation import gettext_lazy as __
from rest_framework import permissions, request, response, status, views as rest_views
from rest_framework_simplejwt import views as jwt_views  # type: ignore

from authentication import serializers
from tasks import email_tasks

User = auth.get_user_model()


class RegisterUserView(rest_views.APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request: request.Request) -> response.Response:
        user_serializer = serializers.RegisterUserSerializer(data=request.data)
        if user_serializer.is_valid(raise_exception=True):
            user = user_serializer.create(user_serializer.validated_data)
            activation_link = self._generate_account_activation_link(
                request, str(user.email_confirmation_token)
            )
            self._send_account_activation_email(user, activation_link)
            response_message = (
                'Thank You for registering. An email with account activation '
                'link was sent to You. Check your mailbox.'
            )
            return response.Response(
                {'detail': __(response_message)}, status=status.HTTP_201_CREATED
            )

    def _send_account_activation_email(self, user: User, activation_link: str) -> None:
        template_data = {
            'activation_link': activation_link,
            'user_email': user.email,
            'user_name': f'{user.name} {user.surname}',
        }
        email_tasks.send_email_with_account_activation_link.delay(user.email, template_data)

    def _generate_account_activation_link(self, request: request.Request, token: str) -> str:
        link_path = urls.reverse('account-activation-link', kwargs={'token': token})
        return request.build_absolute_uri(link_path)


class TokenObtainPairAdminView(jwt_views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairAdminSerializer


class TokenObtainPairBarberView(jwt_views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairBarberSerializer


class TokenObtainPairCustomerView(jwt_views.TokenViewBase):

    serializer_class = serializers.TokenObtainPairCustomerSerializer
