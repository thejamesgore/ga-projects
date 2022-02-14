from django.test import TestCase, SimpleTestCase
from urllib import response
from django.urls import reverse, resolve
from base.views import getRoutes, getUserProfile, updateUserProfile, registerUser, getUserProfile, getProducts, getTopProducts, addOrderItems

# Create your tests here.

class URLTests(TestCase):
    #  Testing all urls resolve to their relevant views
    def test_basePath_resolves(self):
        url = reverse('routes')
        self.assertEquals(resolve(url).func, getRoutes)
    
    def test_userProfile_resolves(self):
        url = reverse('user-profile')
        self.assertEquals(resolve(url).func, getUserProfile)
    
    def test_userProfileUpdate_resolves(self):
        url = reverse('user-profile-update')
        self.assertEquals(resolve(url).func, updateUserProfile)
    
    def test_registerUser_resolves(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, registerUser)

    def test_getUserProfile_resolves(self):
        url = reverse('users')
        self.assertEquals(resolve(url).func, getUserProfile)
    
    def test_getProducts_resolves(self):
        url = reverse('products')
        self.assertEquals(resolve(url).func, getProducts)
    
    def test_getTopProducts_resolves(self):
        url = reverse('top-products')
        self.assertEquals(resolve(url).func, getTopProducts)
    
    def test_addOrderItems_resolves(self):
        url = reverse('add-orders')
        self.assertEquals(resolve(url).func, addOrderItems)



    # Testing django routing working effectively with Hashrouter
    def test_testHomePage(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_api(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)
        
    def test_adminPanel(self):
        response = self.client.get('/admin/')
        self.assertEqual(response.status_code, 302)

    
