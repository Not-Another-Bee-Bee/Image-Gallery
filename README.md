# Getting started with Image Gallery:

1) npm run seedDB
2) npm run react-dev
3) npm run start

# CRUD API Documentation# Image Gallery

### Listing Routes:

* **URL**: /listings/:listingID/users/:userID/images
  * **Notes:** Gets data for all images in a specific listing
  * **Method:** _`GET`_
  * **Example:** `GET listings/25/images`   
  Gets all data from images in a listing with ID 25
  * **URL Params:** `listingID = [integer]`
  * **Returns:**
```javascript
image = [
  { 
    photo_url VARCHAR(250) NOT NULL,
    listing_address VARCHAR(250) NOT NULL,
    price MONEY NOT NULL,
    numBedrooms INTEGER NOT NULL,
    numBathrooms INTEGER NOT NULL,
    sqft INTEGER NOT NULL, 
    saleStatus VARCHAR(250) NOT NULL,
    saved BOOLEAN NOT NULL
  }
]
```
* **URL**: /listings/:listingID/users/:userID/images/:imageID
  * **Notes:** Gets data for a specific image in a specific listing
  * **Method:** _`GET`_
  * **Example:** `GET listings/25/images/3`   
  Gets a image with ID 3 from a listing with ID 25
  * **URL Params:** `listingID = [integer], imageID = [integer]`
  * **Returns:**
```javascript
image =
  {
    photo_url VARCHAR(250) NOT NULL,
    listing_address VARCHAR(250) NOT NULL,
    price MONEY NOT NULL,
    numBedrooms INTEGER NOT NULL,
    numBathrooms INTEGER NOT NULL,
    sqft INTEGER NOT NULL, 
    saleStatus VARCHAR(250) NOT NULL,
    saved BOOLEAN NOT NULL
  }
```

* **URL**: '/listings/:listingID/agents/:agentID/image'
  * **Notes:** Post image to a specific listing by a specific agent
  * **Method:** _`POST`_
  * **Example:** `POST listings/12/agents/5/images`  
  Posts a image to a listing with ID 12 by an agent with ID 5
  * **URL Params:** `listingID = [integer], agentID = [integer]` 
  * **Request Body:**
```javascript
image =
  {
    photo_url VARCHAR(250) NOT NULL,
    listing_address VARCHAR(250) NOT NULL,
    price MONEY NOT NULL,
    numBedrooms INTEGER NOT NULL,
    numBathrooms INTEGER NOT NULL,
    sqft INTEGER NOT NULL, 
    saleStatus VARCHAR(250) NOT NULL,
    saved BOOLEAN NOT NULL
  }
```

* **URL**: listings/:listingID/agents/:agentID/images/:imageID
  * **Notes:** Update a image in a specific listing by a specific agent
  * **Method:** _`PUT`_
  * **Example:** `PUT listings/25/agents/5/images/3`   
  Updates a image with ID 3 in a listing with ID 25 by an agent with ID 5
  * **URL Params:** `listingID = [integer] agentID = [integer] imageID = [integer]`
  * **Request Body:**
```javascript
image =
  {
    photo_url VARCHAR(250) NOT NULL,
    listing_address VARCHAR(250) NOT NULL,
    price MONEY NOT NULL,
    numBedrooms INTEGER NOT NULL,
    numBathrooms INTEGER NOT NULL,
    sqft INTEGER NOT NULL, 
    saleStatus VARCHAR(250) NOT NULL,
    saved BOOLEAN NOT NULL
  }
```

* **URL**: /listings/:listingID/agents/:agentID/images/:imageID
  * **Notes:** Partially update a image in a specific listing by a specific agent
  * **Method:** _`PATCH`_
  * **Example:** `PATCH listings/25/agents/5/images/3`  
  Partially updates a image with ID 3 in a listing with ID 25 by an agent with ID 5 
  * **URL Params:** `listingID = [integer] agentID = [integer] imageID = [integer]`
  * **Request Body:**
```javascript
image =
  {
    photo_url VARCHAR(250) NOT NULL,
    listing_address VARCHAR(250) NOT NULL,
    price MONEY NOT NULL,
    numBedrooms INTEGER NOT NULL,
    numBathrooms INTEGER NOT NULL,
    sqft INTEGER NOT NULL, 
    saleStatus VARCHAR(250) NOT NULL,
    saved BOOLEAN NOT NULL
  }
```
  Include any of the properties in the request body to partially update

* **URL**: /listings/:listingID/agents/:agentID/images/:imageID
  * **Notes:** Delete a image in a specific listing by a specific agent
  * **Method:** _`DELETE`_
  * **Example:** `DELETE listings/25/agents/5/images/3`  
  Deletes a image with ID 3 in a listing with ID 25 by an agent with ID 5
  * **URL Params:** `listingID = [integer] agentID = [integer] imageID = [integer]`
  * **Request Body:**
  None

* **URL**: /listings/:listingID/agents/:agentID/images
  * **Notes:** Deletes all images in a specific listing by a specific agent
  * **Method:** _`DELETE`_
  * **Example:** `DELETE listings/25/agents/5/images`  
  Deletes all images in a listing with a ID 25 by an agent with ID 5
  * **URL Params:** `listingID = [integer] agentID = [integer]`
  * **Request Body:**
  None
