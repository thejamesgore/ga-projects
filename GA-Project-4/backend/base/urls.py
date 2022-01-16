from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('', views.getRoutes, name="routes"),

    # user views
    path('users/profile/', views.getUserProfile, name="user-profile"),
    path('users/profile/update/', views.updateUserProfile,
         name="user-profile-update"),
    path('users/register/', views.registerUser, name="register"),
    path('users/', views.getUserProfile, name="users"),

    # product views
    path('products/', views.getProducts, name="products"),
    path('products/top/', views.getTopProducts, name="top-products"),
    path('products/<str:pk>/', views.getProduct, name="product"),

    # order views
    path('orders/add/', views.addOrderItems, name="add-orders")

]
