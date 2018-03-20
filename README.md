# RealEstate using Angular, Django and MongoDB

# Services used / Minimum Requirements - 

Angular 5 - This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.
Python 3.6.3
MongoDb v3.6.3
Django 2.0.2

I have used Ubuntu 16.04 for the development of this project, conflicts may arrive when running it in other OS.

# Installation / Configuration -

Install 'djongo' `pip install djongo` https://github.com/nesdis/djongo 
-- For connecting Django with MongoDB (check doc and minimum requirement from link for configuration)

Install 'Django rest framework' `pip install djangorestframework` http://www.django-rest-framework.org/
-- Add 'rest_framework', 'rest_framework.authtoken' to the INSTALLED_APPS in Django

FOR CORS / Access-Control-Allow-Origin issue  -
Install `pip install django-cors-headers`
-- Add 'corsheaders' to the INSTALLED_APPS and 'corsheaders.middleware.CorsMiddleware' to MIDDLEWARE and CORS_ORIGIN_WHITELIST = 'localhost:4200' at the bottom of the file  in Django

## Superuser Django details

email - realestate@gmail.com
Name: Real Estate
Password: realestate

# Running the project

`ng serve` in the root directory - Angular 
-- open http://localhost:4200/ 

`sudo service mongod start` for starting mongoDB server
-- Note: this command may vary acc to the OS, please check mongodb for the right command for your system 

`python manage.py runserver` in the ~/realEstate directory  - Python  
-- open http://localhost:8000/ 
-- Note: Mongodb must be running before running python server
-- Note: python3/ python3.6 command may vary in different os according to the python version configured in your OS


THANKS

HOPE YOU WILL LIKE MY EFFORTS