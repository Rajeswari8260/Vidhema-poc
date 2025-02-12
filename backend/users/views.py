from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    # def post(self, request):
    #     email = request.data.get("email")
    #     password = request.data.get("password")
    #     user = authenticate(username=email, password=password)

    #     if user is not None:
    #         refresh = RefreshToken.for_user(user)
    #         return Response({
    #             "access": str(refresh.access_token),
    #             "refresh": str(refresh),
    #             "message": "Login successful"
    #         }, status=status.HTTP_200_OK)

    #     return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    # class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        # user = authenticate(username=email, password=password)

        # if user is not None:
        #     refresh = RefreshToken.for_user(user)
        #     return Response({
        #         "access": str(refresh.access_token),
        #         "refresh": str(refresh),
        #         "message": "Login successful"
        #     }, status=status.HTTP_200_OK)

        # return JsonResponse({"error": "Invalid credentials"}, status=401)
        User = get_user_model()  # Get the custom user model

        try:
            user = User.objects.get(email=email)  # Fetch user by email
            user = authenticate(username=user.username, password=password)  # Authenticate using username

            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "message": "Login successful"
                }, status=status.HTTP_200_OK)

            return JsonResponse({"error": "Invalid credentials"}, status=401)

        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)