# Project Name: E-commerce API

(Update 22/Aug/24: Converted to Typescript)

## Features:

User registration\
User authentication\
Set user as admin (Admin only)\
Retrieve all active products\
Retrieve single product\
Create Product (Admin only)\
Update Product Information (Admin only)\
Archive Product (Admin only)\
Create Order (Registered User only)\
Get All Orders (Admin only)\
Get User Orders (Registered User only)\
Activate Product (Admin only)

## Credentials:

**Admin User** \
```console
{
	"email": "admin123@mail.com",
	"password": "admin123"
}
```
**Non-Admin User** \
```console
{
	"email": "user1234@mail.com",
	"password": "user1234"
}
```

## Routes and Request Body:

**User Registration:** \
POST - http://localhost/4000/users/register \
Body: (JSON)
```console
{
	"email": "String",
	"password": "String",
	"firstName": "String",
	"lastName": "String",
	"mobileNo": "String"
}
```

**User Login:** \
POST - http://localhost:4000/users/login \
Body: (JSON)
```console
{
    "email": "String",
    "password": "String"
}
```

**Set User as Admin:** \
PUT - http://localhost:4000/users/setAdmin/:id \
Body: No Request Body \
Admin Token Required

**Get All Active Products:** \
GET - http://localhost:4000/products \
Body: No Request Body

**Get Single Product:** \
GET - http://localhost:4000/products/:id \
Body: No Request Body

**Create Product:** \
POST - http://localhost:4000/products \
Body: (JSON)
```console
{
    "productName": "String",
    "description": "String",
    "price": Number
}
```
Admin Token Required

**Update Product:** \
PUT - http://localhost:4000/products/:id  \
Body: (JSON)
```console
{
    "productName": "String",
    "description": "String",
    "price": Number,
    "isActive": Boolean
}
```
Admin Token Required

**Archive Product:** \
PUT - http://localhost:4000/products/archive/:id  \
Body: No Request Body \
Admin Token Required

**Create Order:** \
POST - http://localhost:4000/users/createOrder  \
Body: (JSON)
```console
{
	"products": [
		{
			"productId": "String",
	        "productName": "String",
	        "priceSold": Number,
	        "quantity": Number,
		}
	],
	"totalAmount": Number
}
```
User Token Required

**Get All Orders:** \
GET - http://localhost:4000/users/allOrders \
Body: No Request Body \
Admin Token Required

**Get User Orders:** \
GET - http://localhost:4000/users/myOrders \
Body: No Request Body \
User Token Required

**Activate Product:** \
PUT - http://localhost:4000/products/activate/:id \
Body: No Request Body \
Admin Token Required


