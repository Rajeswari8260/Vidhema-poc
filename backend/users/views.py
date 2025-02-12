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
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

User = get_user_model()    

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
   def post(self, request):
        email = request.data.get("email").lower()
        password = request.data.get("password")

        print(f"🔍 Debug: Attempting login for email: {email}")

        # Print all users to confirm Django is seeing them
        print("🔍 Debug: Listing all users in database...")
        users = CustomUser.objects.all()
        for user in users:
            print(f"User: {user.username}, Email: {user.email}")

        try:
            user = CustomUser.objects.get(email=email)
            print(f"✅ Debug: User found: {user.username}")

            if not user.check_password(password):
                print("❌ Debug: Password mismatch!")
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        except CustomUser.DoesNotExist:
            print("❌ Debug: User not found!")
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        print("🎉 Debug: Login successful!")
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": "Login successful"
        }, status=status.HTTP_200_OK)
   
class UserDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number,
            "address": user.address
        }) 