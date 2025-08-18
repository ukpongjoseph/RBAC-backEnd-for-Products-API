# RBAC-backEnd-for-Products-API
This is a backEnd product that builds a RESTFUL API with node, espress, basic authentication and authorization logic
PROJECT TITLE AND DESCRIPTION


TITLE : ROLE BASED ACCESS CONTROL CRUD API WITH AUTHENTICATION



DESCRIPTON : This project builds a REST API using node js, express js, with basic backEnd logic, authentication, and authorization logic. This project allows users to register, login, perform CRUD operations and access protected routes based on authentication token and user roles. Users are able to create, retrieve, update and delete products based on their roles on the system


INSTALLATION
(i) Clone the github reposository (git clone "repo link")
(ii) Install all dependencies (npm install)
(iii) Create a .env file in the root directory to store required variables
(iv) The .env file should hold variables like jwt_secret, dbURL (Mongo DB connection string)....if you don't have one follow this tutorial : "https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string"
(v) Start server (npm run dev)


AUTHENTICATION AND ROLES
Authentication helps verifying a user identity and this is achieved using jsonwebtoken to generate an expirable token for user on logging in while authorization in this project ensures that users can only access the features, data, and functionalities that are explicitly permitted by their assigned roles, preventing unauthorized access and potential data breaches. For example, an "admin" might have full control, while a "user/viewer" can only read specific content

The process of authentication involves
(i) Registering with valid details
(ii) Logging In with regstered details (which generates a user token)
Token is now used in Authorization header (Bearer <token>) to verify each user that wants to access protected. Verification is achieved using jwt.verify from the jsonwebtoken dependency. On successful verification user is validated  and user details (user role and user id) which usually makes up the payload is used to identify each user making a specific request. If verification fails (due to an invalid token or an expired one), an error is sent to the user.
To better understand jsonwebtoken check the url : "https://jwt.io/introduction#:~:text=JSON%20Web%20Token%20(JWT)%20is,because%20it%20is%20digitally%20signed."

The process of authorization involves
(i) When a user tries to access a role based resources after successful verification, the user role (from the user details after verification) is checked against the list of permitted roles. If user's role grant permission access is granted, else access is denied. 

In this system, admins are permitted to accees all routes while viewers/users(non-admin) can only retrieve resources



ENDPOINTS WITH REQUEST/RESPONSE EXAMPLE
The endpoint of this project are critically classified into two
(i) Authentication EndPoints (AUTH) : Covers registration, loggin in into the system, getting users details (admin only), deleting a non-admin user(admin only)
(ii) Product Endpoints (PRODUCTS) : Covers creation, Update, deleting and retrieving products

(A) AUTH
 (1) REGISTER
    METHOD : POST
    Api Endpoint : /api/v1/auth/user/register
    Request :
    {
        "userName" : "Abimbola Adeola",
        "email" : "Justin24@gmail.com",
        "password" : "123456789",
        "role" : "user"
    }
    Response : 
    {
        success : true,
        msg : "User Created",
        user : {
            "_id" : "689d55f7d88ffad3eebd495c"
            "userName" : "Abimbola Adeola",
            "email" : "Justin24@gmail.com",
            "password" : "gjdkjlnriejtglme'fjovt'gnjfvephhkclerjfrhfrfee",
            "role" : "user",
            "createdAt" : "2025-08-15T14:25:30.123Z",
            "updatedAt" : "2025-08-15T14:25:30.123Z", 
            __v : 0
        }
    }



(2) LOGIN
 METHOD : POST
 Api Endpoint : /api/v1/auth/user/login
 Requets: 
{
    "email" : "Shodo24@gmail.com",
    "password" : "123456789"
}
Response :
{
    success : true,
    "_id": "64b7a02f2c9c4a12b4a6f3a1",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "role": "user",
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODljMTg3OGU0NjZkOTRhYjM4MDE0ZmYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTUxNDExNjMsImV4cCI6MTc1NTE0NDc2M30.6aj44-qzEN_Yg9GG6nO847yND5qzzi0l72uSauaG-Z0"
}




(3) GET ALL USERS (admin only)
 METHOD : GET
 Api Endpoint : /api/v1/auth/user/all
 token : Bearer <jwt_token> (to be included in request headers)
 Request : {

 }
 Response : {
    success : true,
    users : [
        {
      "_id": "64b7a02f2c9c4a12b4a6f3a1",
      "username": "johndoe",
      "email": "johndoe@example.com",
      "role": "user",
      "createdAt": "2025-08-15T14:25:30.123Z"
    },
    {
      "_id": "64b7a04b2c9c4a12b4a6f3a2",
      "username": "janedoe",
      "email": "janedoe@example.com",
      "role": "admin",
      "createdAt": "2025-08-14T09:15:20.456Z"
    }
    ]
 }

 (4) Delete A NON-ADMIN USER (admin only)
  METHOD : DELETE
 Api Endpoint : /api/v1/auth/user/delete/:userId
 token : Bearer <jwt_token> (to be included in request headers)
 Request : {

 }
 Response : {
    success : true,
    msg : "User deleted successfully"
 }


(B) PRODUCTS

(1) CREATE A PRODUCT
METHOD : POST
Api Endpoint : /api/v1/product/create-product 
TOKEN : Bearer <jwt_token> (to be included in request headers)
Request : 
    {
    "productName" : "Gold chain",
    "category" : "Men",
    "price" : "100",
    "quantity" : "10"
}
Response : 
{
  "success": true,
  "product": {
    "productName": "Gold chain",
    "category": "Men",
    "price": 100,
    "quantity": 10,
    "productSeller": "689f730caf5e6f2e881cc763",
    "_id": "689f7527af5e6f2e881cc76e",
    "createdAt": "2025-08-15T17:57:59.994Z",
    "updatedAt": "2025-08-15T17:57:59.994Z",
    "__v": 0
  }
}

(2) GET ALL PRODUCTS
METHOD : GET
Api Endpoint : /api/v1/product/all-products
TOKEN : Bearer <jwt_token> (to be included in request headers)
Request : {

}
Response :{
  "success": true,
  "products": [
    {
      "_id": "689e80d200d660edc10074ee",
      "productName": "Gold",
      "category": "Men",
      "price": 3000,
      "productSeller": "689e7e5800d660edc10074e9",
      "createdAt": "2025-08-15T00:35:30.595Z",
      "updatedAt": "2025-08-15T00:35:30.595Z",
      "__v": 0
    },
    {
      "_id": "689e7ee800d660edc10074ec",
      "productName": "Gold",
      "category": "Men",
      "price": 3000,
      "quantity": 20,
      "productSeller": "689e7e5800d660edc10074e9",
      "createdAt": "2025-08-15T00:27:20.639Z",
      "updatedAt": "2025-08-15T00:27:20.639Z",
      "__v": 0
    },
    {
      "_id": "689c2032d62ee0da83078817",
      "productName": "Shoe",
      "category": "Women",
      "price": 350,
      "quantity": 70,
      "productSeller": "689c1878e466d94ab38014ff",
      "createdAt": "2025-08-13T05:18:42.508Z",
      "updatedAt": "2025-08-15T00:46:07.905Z",
      "__v": 0
    },
    {
      "_id": "689c1eb02f88a1dd2e3a8645",
      "productName": "Shoe",
      "category": "Men",
      "price": 500,
      "quantity": 20,
      "productSeller": "689c1878e466d94ab38014ff",
      "createdAt": "2025-08-13T05:12:16.012Z",
      "updatedAt": "2025-08-13T05:12:16.012Z",
      "__v": 0
    }
  ]
}

(3) UPDATE A PRODUCT
METHOD : PATCH
Api Endpoint : /api/v1/product/update-product/:productId
TOKEN : Bearer <jwt_token> (to be included in request headers)
Request : {
    "price" : "500"
}
Response :{
  "success": true,
  "msg": "Update Successful",
  "product": {
    "_id": "689c2032d62ee0da83078817",
    "productName": "Shoe",
    "category": "Women",
    "price": 500,
    "quantity": 70,
    "productSeller": "689c1878e466d94ab38014ff",
    "createdAt": "2025-08-13T05:18:42.508Z",
    "updatedAt": "2025-08-15T18:10:56.650Z",
    "__v": 0
  }
}

(4) GET A SINGLE PRODUCT
METHOD : GET
Api Endpoint : /api/v1/product/:productId
TOKEN : Bearer <jwt_token> (to be included in request headers)
Request : {

}
Response : {
  "success": true,
  "product": {
    "_id": "689f7527af5e6f2e881cc76e",
    "productName": "Gold chain",
    "category": "Men",
    "price": 100,
    "quantity": 10,
    "productSeller": "689f730caf5e6f2e881cc763",
    "createdAt": "2025-08-15T17:57:59.994Z",
    "updatedAt": "2025-08-15T17:57:59.994Z",
    "__v": 0
  }
}

(5) DELETE A PRODUCT
METHOD : DELETE
Api Endpoint : /api/v1/product/delete/:productId
TOKEN : Bearer <jwt_token> (to be included in request headers)
Request : {

}
Response : {
  "success": true,
  "msg": "Product deleted successfully"
}

(6) GET ALL PRODUCTS SPECIFIC TO AN ADMIN
METHOD : GET
Api Endpoint : /api/v1/product/admin/all-products
TOKEN : Bearer <jwt_token> (to be included in request headers)
Request : {

}
Response : {
  "success": true,
  "msg": "Here are your products",
  "products": [
    {
      "_id": "689f7527af5e6f2e881cc76e",
      "productName": "Gold chain",
      "category": "Men",
      "price": 100,
      "quantity": 10,
      "productSeller": {
        "_id": "689f730caf5e6f2e881cc763",
        "userName": "Boderina Thomas"
      },
      "createdAt": "2025-08-15T17:57:59.994Z",
      "updatedAt": "2025-08-15T17:57:59.994Z",
      "__v": 0
    },

    {
    "_id": "689f7527af5e6f2e881cc76e",
    "productName": "Gold chain",
    "category": "Men",
    "price": 100,
    "quantity": 10,
    "productSeller": {
      "_id": "689f730caf5e6f2e881cc763",
      "userName": "Boderina Thomas"
    },
    "createdAt": "2025-08-15T17:57:59.994Z",
    "updatedAt": "2025-08-15T17:57:59.994Z",
    "__v": 0
    }
  ]
}

(7) GET A PRODUCTS SPECIFIC TO AN ADMIN
METHOD : GET
Api Endpoint : /api/v1/product/admin/:productId
TOKEN : Bearer <jwt_token> (to be included in request headers)
Request : {

}
Response : {
  "success": true,
  "msg": "Here is your product",
  "product": {
    "_id": "689f7527af5e6f2e881cc76e",
    "productName": "Gold chain",
    "category": "Men",
    "price": 100,
    "quantity": 10,
    "productSeller": {
      "_id": "689f730caf5e6f2e881cc763",
      "userName": "Boderina Thomas"
    },
    "createdAt": "2025-08-15T17:57:59.994Z",
    "updatedAt": "2025-08-15T17:57:59.994Z",
    "__v": 0
  }
}


For a better request, response simulation check : "https://documenter.getpostman.com/view/45650004/2sB3BHk8ts"