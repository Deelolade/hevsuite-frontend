# Hevsuite Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### User Management

#### Public Routes

##### Register User
```http
POST /users/register
```
**Request Body:**
```json
{
  "title": "string",
  "forename": "string",
  "surname": "string",
  "gender": "string",
  "dob": "string (ISO date)",
  "relationshipStatus": "string",
  "nationality": "string",
  "additionalNationality": "string (optional)",
  "addressLine1": "string",
  "city": "string",
  "country": "string",
  "postcode": "string",
  "primaryEmail": "string",
  "secondaryEmail": "string (optional)",
  "primaryPhone": "string",
  "secondaryPhone": "string (optional)",
  "state": "string (optional)",
  "employmentStatus": "string",
  "isClubMember": "string (optional)",
  "preferredSocialMedia": ["string"] (optional),
  "userInterests": ["string"] (optional),
  "password": "string",
  "profilePhoto": "file (optional)",
  "idCardPhoto": "file (optional)"
}
```
**Response:** Success message with email verification instructions

**Notes:**
- All fields marked as required must be provided
- `userInterests` must be one or more of: "art & design", "dance", "film", "music/dj", "cigars", "family entertainment", "food", "politics", "country pursuit", "fashion", "literature", "sport"
- Profile photo and ID card photo are optional but recommended
- Email verification is required before the account can be used
- Role defaults to "member"
- Membership status defaults to "pending"

##### Admin Register
```http
POST /users/admin/register
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "string"
}
```
**Response:** Admin user object

##### Verify Email
```http
GET /users/verify-email?token=<verification_token>
```
**Response:** Success message

##### Login
```http
POST /users/login
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:** User object with token

##### Verify 2FA
```http
POST /users/verify-2fa
```
**Request Body:**
```json
{
  "token": "string",
  "code": "string"
}
```
**Response:** Success message

##### Forgot Password
```http
POST /users/forgot-password
```
**Request Body:**
```json
{
  "email": "string"
}
```
**Response:** Success message

##### Reset Password
```http
POST /users/reset-password
```
**Request Body:**
```json
{
  "token": "string",
  "newPassword": "string"
}
```
**Response:** Success message

#### Protected Routes

##### Setup 2FA
```http
POST /users/setup-2fa
```
**Headers:** Authorization token required
**Response:** 2FA setup details

##### Logout
```http
POST /users/logout
```
**Headers:** Authorization token required
**Response:** Success message

##### Get Profile
```http
GET /users/profile
```
**Headers:** Authorization token required
**Response:** User profile object

##### Update User
```http
PUT /users/update
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "profilePhoto": "file",
  "idCardPhoto": "file"
}
```
**Response:** Updated user object

##### Deactivate Account
```http
POST /users/deactivate
```
**Headers:** Authorization token required
**Response:** Success message

##### Reactivate Account
```http
POST /users/reactivate
```
**Headers:** Authorization token required
**Response:** Success message

### Referral Management

##### Send Referral Request
```http
POST /users/referrals/send
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "email": "string",
  "message": "string"
}
```
**Response:** Referral request object

##### Update Referral Status
```http
PUT /users/referrals/update
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "referralId": "string",
  "status": "string"
}
```
**Response:** Updated referral object

##### Check User Referral
```http
GET /users/check-referral
```
**Headers:** Authorization token required
**Response:** Referral status object

### Admin Routes

##### Admin Dashboard
```http
GET /users/admin-dashboard
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Dashboard data

##### Approve User Membership
```http
PUT /users/users/approve-membership
```
**Headers:** Authorization token required
**Permissions:** "Approve & Decline verification" required
**Request Body:**
```json
{
  "userId": "string",
  "status": "string"
}
```
**Response:** Updated user object

##### Get All Users
```http
GET /users/users
```
**Headers:** Authorization token required
**Permissions:** "User Management" required
**Response:** Array of user objects

##### Update User Role
```http
PUT /users/users/update-role
```
**Headers:** Authorization token required
**Permissions:** "Edit & Delete Admins" required
**Request Body:**
```json
{
  "userId": "string",
  "role": "string"
}
```
**Response:** Updated user object

### Superadmin Routes

##### Superadmin Dashboard
```http
GET /users/superadmin-dashboard
```
**Headers:** Authorization token required
**Permissions:** Superadmin role required
**Response:** Dashboard data

##### Delete User
```http
DELETE /users/users/delete
```
**Headers:** Authorization token required
**Permissions:** "User Management" required
**Request Body:**
```json
{
  "userId": "string"
}
```
**Response:** Success message

### Admin User Management

##### Create Admin User
```http
POST /users/admin-users
```
**Headers:** Authorization token required
**Permissions:** Superadmin role and "Edit & Delete Admins" required
**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "string"
}
```
**Response:** Created admin user object

##### Update Admin User
```http
PUT /users/admin-users/:id
```
**Headers:** Authorization token required
**Permissions:** "Edit & Delete Admins" required
**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "role": "string"
}
```
**Response:** Updated admin user object

##### Delete Admin User
```http
DELETE /users/admin-users/:id
```
**Headers:** Authorization token required
**Permissions:** "Edit & Delete Admins" required
**Response:** Success message

##### Get All Admin Users
```http
GET /users/admin-users
```
**Headers:** Authorization token required
**Permissions:** Admin or Superadmin role required
**Response:** Array of admin user objects

### Additional User Management

##### Update Membership Status
```http
PUT /users/update-membership-status
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "userId": "string",
  "status": "string"
}
```
**Response:** Updated user object

##### Search Users by Name
```http
GET /users/users/search?name=<search_term>
```
**Headers:** Authorization token required
**Response:** Array of matching user objects

##### Get User Details
```http
GET /users/admin/users/:userId/details
```
**Headers:** Authorization token required
**Response:** Detailed user object

##### Get Pending Registrations
```http
GET /users/pending-registrations
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of pending registration objects

##### Get User Events
```http
GET /users/:userId/events
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of user event objects

##### Get User Activity
```http
GET /users/:userId/activity
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of user activity objects

##### Update User Status
```http
PUT /users/status/:userId
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "status": "string"
}
```
**Response:** Updated user object

##### Reset User Password
```http
POST /users/reset-password/:userId
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "newPassword": "string"
}
```
**Response:** Success message

##### Request New Verification
```http
POST /users/request-verification/:userId
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Success message

##### Invite User
```http
POST /users/invite
```
**Headers:** Authorization token required
**Permissions:** Admin or Superadmin role required
**Request Body:**
```json
{
  "email": "string",
  "role": "string"
}
```
**Response:** Invitation object

### Event Management

All event routes require authentication.

##### Get All Events
```http
GET /events/all
```
**Headers:** Authorization token required
**Permissions:** "Event Management" required
**Response:** Array of event objects

##### Get Event Locations
```http
GET /events/locations
```
**Headers:** Authorization token required
**Permissions:** "Event Management" required
**Response:** Array of unique event locations

##### Get Visible Events
```http
GET /events/visible
```
**Headers:** Authorization token required
**Response:** Array of visible event objects

##### Create Event
```http
POST /events
```
**Headers:** Authorization token required
**Permissions:** "Event Management" required
**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "date": "string",
  "time": "string",
  "location": "string",
  "images": ["file"]
}
```
**Response:** Created event object

##### Update Event
```http
PUT /events/:id
```
**Headers:** Authorization token required
**Permissions:** "Event Management" required
**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "date": "string",
  "time": "string",
  "location": "string",
  "images": ["file"]
}
```
**Response:** Updated event object

##### Delete Event
```http
DELETE /events/:id
```
**Headers:** Authorization token required
**Permissions:** "Event Management" required
**Response:** Success message

##### Invite Users to Event
```http
POST /events/:id/invite
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "userIds": ["string"]
}
```
**Response:** Success message

##### Update Invite Status
```http
PUT /events/:id/invite-status
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "status": "string"
}
```
**Response:** Updated invite status

##### Get Attended Past Events
```http
GET /events/attended
```
**Headers:** Authorization token required
**Response:** Array of past event objects

##### Get Invited Events
```http
GET /events/invited
```
**Headers:** Authorization token required
**Response:** Array of invited event objects

##### Get Attending Events
```http
GET /events/attending
```
**Headers:** Authorization token required
**Response:** Array of upcoming event objects

##### Get Attending Members
```http
POST /events/:id/attending-members
```
**Headers:** Authorization token required
**Response:** Array of attending member objects

##### Get Saved Events
```http
GET /events/saved
```
**Headers:** Authorization token required
**Response:** Array of saved event objects

### Payment Management

##### Create Payment Session
```http
POST /payments/create-session
```
**Request Body:**
```json
{
  "amount": "number",
  "currency": "string",
  "paymentMethod": "string"
}
```
**Response:** Payment session object

##### Stripe Webhook
```http
POST /payments/webhook/stripe
```
**Request Body:** Stripe webhook payload
**Response:** Success message

##### PayPal Webhook
```http
POST /payments/webhook/paypal
```
**Request Body:** PayPal webhook payload
**Response:** Success message

##### Mastercard Webhook
```http
POST /payments/webhook/mastercard
```
**Request Body:** Mastercard webhook payload
**Response:** Success message

##### Amazon Webhook
```http
POST /payments/webhook/amazon
```
**Request Body:** Amazon webhook payload
**Response:** Success message

##### Update Payment Method (Admin Only)
```http
POST /payments/admin/update
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "method": "string",
  "enabled": "boolean",
  "settings": "object"
}
```
**Response:** Updated payment method object

##### Get Payment Methods (Admin Only)
```http
GET /payments/admin/methods
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of payment method objects

### Club Card Management

##### Get Card Status
```http
GET /club-cards/card-status/:cardId
```
**Response:** Card status object

##### Get New Members (Admin Only)
```http
GET /club-cards/admin/new-members
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of new member objects

##### Generate Club Card (Admin Only)
```http
POST /club-cards/admin/generate-card
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "userId": "string",
  "cardType": "string"
}
```
**Response:** Generated card object

##### Post Cards (Admin Only)
```http
POST /club-cards/admin/post-cards
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:** PDF file
**Response:** Success message

##### Issue Cards (Admin Only)
```http
POST /club-cards/admin/issue-cards
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "cardIds": ["string"]
}
```
**Response:** Success message

##### Cancel Card (Admin Only)
```http
PUT /club-cards/admin/cancel-card/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Success message

##### Bulk Cancel Cards (Admin Only)
```http
POST /club-cards/admin/bulk-cancel
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "cardIds": ["string"]
}
```
**Response:** Success message

##### Approve Club Card (Admin Only)
```http
PUT /club-cards/admin/approve/:cardId
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Success message

##### Get Card QR Code (Admin Only)
```http
GET /club-cards/admin/qr-code/:cardId
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** QR code object

##### Regenerate QR Code (Admin Only)
```http
POST /club-cards/admin/regenerate-qr/:cardId
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** New QR code object

##### Verify QR Code
```http
POST /club-cards/verify-qr
```
**Request Body:**
```json
{
  "qrCode": "string"
}
```
**Response:** Verification result object

##### Get All Users (Admin Only)
```http
GET /club-cards/admin/users
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of user objects

##### Issue New Card
```http
POST /club-cards/issue
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "cardType": "string"
}
```
**Response:** Issued card object

##### Activate Card
```http
POST /club-cards/activate
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "cardId": "string"
}
```
**Response:** Success message

##### Deactivate Card
```http
POST /club-cards/deactivate
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "cardId": "string"
}
```
**Response:** Success message

##### Log Suspicious Activity
```http
POST /club-cards/log-suspicious
```
**Headers:** Authorization token required
**Request Body:**
```json
{
  "cardId": "string",
  "activity": "string",
  "details": "string"
}
```
**Response:** Success message

### Content Management System (CMS)

All CMS routes require authentication and "CMS Management" permission.

#### Landing Pages

##### Get All Landing Pages
```http
GET /cms/landing-pages
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Array of landing page objects

##### Get Landing Page by ID
```http
GET /cms/landing-pages/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Landing page object

##### Create Landing Page
```http
POST /cms/landing-pages
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with media file
**Response:** Created landing page object

##### Update Landing Page Order
```http
PUT /cms/landing-pages/order
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:**
```json
{
  "order": ["string"]
}
```
**Response:** Success message

##### Update Landing Page
```http
PUT /cms/landing-pages/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with media file
**Response:** Updated landing page object

##### Delete Landing Page
```http
DELETE /cms/landing-pages/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Success message

#### Menus

##### Get All Menus
```http
GET /cms/menus
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Array of menu objects

##### Get Menu by ID
```http
GET /cms/menus/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Menu object

##### Create Menu
```http
POST /cms/menus
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with hero section images
**Response:** Created menu object

##### Update Menu
```http
PUT /cms/menus/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with hero section images
**Response:** Updated menu object

##### Update Menu Order
```http
PUT /cms/menus/order
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:**
```json
{
  "order": ["string"]
}
```
**Response:** Success message

##### Delete Menu
```http
DELETE /cms/menus/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Success message

#### Pages

##### Get All Pages
```http
GET /cms/pages
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Array of page objects

##### Get Page by ID
```http
GET /cms/pages/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Page object

##### Create Page
```http
POST /cms/pages
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with slide images
**Response:** Created page object

##### Update Page
```http
PUT /cms/pages/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with slide images
**Response:** Updated page object

##### Delete Page
```http
DELETE /cms/pages/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Success message

#### Footer

##### Get All Footers
```http
GET /cms/footer
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Array of footer objects

##### Get Footer by ID
```http
GET /cms/footer/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Footer object

##### Create Footer
```http
POST /cms/footer
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:**
```json
{
  "content": "string"
}
```
**Response:** Created footer object

##### Update Footer Order
```http
PUT /cms/footer/order
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:**
```json
{
  "order": ["string"]
}
```
**Response:** Success message

##### Update Footer
```http
PUT /cms/footer/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:**
```json
{
  "content": "string"
}
```
**Response:** Updated footer object

##### Delete Footer
```http
DELETE /cms/footer/:id
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Success message

#### Site Logos

##### Get All Logos
```http
GET /cms/logos
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Response:** Array of logo objects

##### Upload Website Logo
```http
POST /cms/logos/website-logo
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with logo file
**Response:** Updated logo object

##### Upload Admin Logo
```http
POST /cms/logos/admin-logo
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with logo file
**Response:** Updated logo object

##### Upload Favicon
```http
POST /cms/logos/fav-icon
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with favicon file
**Response:** Updated logo object

##### Upload Footer Icon
```http
POST /cms/logos/footer-icon
```
**Headers:** Authorization token required
**Permissions:** "CMS Management" required
**Request Body:** Form data with icon file
**Response:** Updated logo object

### News Room Management

##### Create News (Admin Only)
```http
POST /news
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:** Form data with images and videos
**Response:** Created news object

##### Update News (Admin Only)
```http
PUT /news/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:** Form data with images and videos
**Response:** Updated news object

##### Delete News (Admin Only)
```http
DELETE /news/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Success message

##### Get All News (Admin Only)
```http
GET /news/admin
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of news objects

##### Get Non-Expired News
```http
GET /news
```
**Response:** Array of non-expired news objects

##### Get News Read Count
```http
GET /news/:id/read-count
```
**Response:** Read count object

##### Get News by ID
```http
GET /news/:id
```
**Response:** News object with incremented read count

### Support Request Management

All support request routes require authentication and admin privileges.

##### Get All Support Requests
```http
GET /support-requests
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of support request objects

##### Get Support Request Details
```http
GET /support-requests/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Support request object with details

##### Update Support Request
```http
PUT /support-requests/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "status": "string",
  "priority": "string",
  "notes": "string"
}
```
**Response:** Updated support request object

##### Add Message to Support Request
```http
POST /support-requests/:id/messages
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "message": "string",
  "isInternal": "boolean"
}
```
**Response:** Updated support request object with new message

##### Delete Support Request
```http
DELETE /support-requests/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Success message

### Pricing Management

All pricing routes require authentication and admin privileges.

##### Get All Pricing Fees
```http
GET /pricing
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Array of pricing fee objects

##### Add Pricing Fee
```http
POST /pricing
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "name": "string",
  "amount": "number",
  "currency": "string",
  "description": "string"
}
```
**Response:** Created pricing fee object

##### Update Pricing Fee
```http
PUT /pricing/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Request Body:**
```json
{
  "name": "string",
  "amount": "number",
  "currency": "string",
  "description": "string"
}
```
**Response:** Updated pricing fee object

##### Delete Pricing Fee
```http
DELETE /pricing/:id
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Success message

### FAQ Management

##### Create FAQ (Admin Only)
```http
POST /faq/admin/create-faqs
```
**Headers:** Authorization token required
**Permissions:** "FAQs Management" required
**Request Body:**
```json
{
  "question": "string",
  "answer": "string",
  "isVisible": "boolean"
}
```
**Response:** Created FAQ object

##### Update FAQ (Admin Only)
```http
PUT /faq/admin/faq/:id
```
**Headers:** Authorization token required
**Permissions:** "FAQs Management" required
**Request Body:**
```json
{
  "question": "string",
  "answer": "string",
  "isVisible": "boolean"
}
```
**Response:** Updated FAQ object

##### Delete FAQ (Admin Only)
```http
DELETE /faq/admin/delete-faqs/:id
```
**Headers:** Authorization token required
**Permissions:** "FAQs Management" required
**Response:** Success message

##### Get All FAQs (Admin Only)
```http
GET /faq/admin/all-faqs
```
**Headers:** Authorization token required
**Permissions:** "FAQs Management" required
**Response:** Array of FAQ objects

##### Get Visible FAQs
```http
GET /faq/faq/visible
```
**Response:** Array of visible FAQ objects

### Social Media Management

##### Create Social Media (Admin Only)
```http
POST /social-media
```
**Headers:** Authorization token required
**Permissions:** "Social Media Management" required
**Request Body:** Form data with icon image
**Response:** Created social media object

##### Update Social Media (Admin Only)
```http
PUT /social-media/:id
```
**Headers:** Authorization token required
**Permissions:** "Social Media Management" required
**Request Body:** Form data with icon image
**Response:** Updated social media object

##### Delete Social Media (Admin Only)
```http
DELETE /social-media/:id
```
**Headers:** Authorization token required
**Permissions:** "Social Media Management" required
**Response:** Success message

##### Reorder Social Media (Admin Only)
```http
POST /social-media/reorder
```
**Headers:** Authorization token required
**Permissions:** "Social Media Management" required
**Request Body:**
```json
{
  "order": ["string"]
}
```
**Response:** Success message

##### Get All Social Media (Admin Only)
```http
GET /social-media/admin
```
**Headers:** Authorization token required
**Permissions:** "Social Media Management" required
**Response:** Array of social media objects

##### Get Visible Social Media
```http
GET /social-media
```
**Response:** Array of visible social media objects

### Site Settings Management

All site settings routes require authentication and "General Settings Management" permission.

##### Get General Settings
```http
GET /site-settings
```
**Headers:** Authorization token required
**Permissions:** "General Settings Management" required
**Response:** General settings object

##### Update General Settings
```http
PUT /site-settings
```
**Headers:** Authorization token required
**Permissions:** "General Settings Management" required
**Request Body:**
```json
{
  "siteName": "string",
  "siteDescription": "string",
  "contactEmail": "string",
  "contactPhone": "string",
  "address": "string",
  "socialMediaLinks": "object",
  "otherSettings": "object"
}
```
**Response:** Updated settings object

### Statistics Management

##### Get Dashboard Statistics (Admin Only)
```http
GET /statistics/dashboard
```
**Headers:** Authorization token required
**Permissions:** Admin role required
**Response:** Dashboard statistics object containing:
- Total users
- Active users
- Total events
- Upcoming events
- Total revenue
- Recent transactions
- Other relevant statistics

### Activity Log Management

##### Get All Activities (Superadmin Only)
```http
GET /activity-logs
```
**Headers:** Authorization token required
**Permissions:** Superadmin role required
**Response:** Array of activity log objects containing:
- User ID
- Action type
- Timestamp
- IP address
- User agent
- Additional details

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "string",
  "message": "string"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse. The current limits are:
- 100 requests per 15 minutes for authenticated users
- 20 requests per 15 minutes for unauthenticated users

## File Upload

For endpoints that accept file uploads:
- Maximum file size: 5MB
- Supported formats: JPG, PNG, PDF
- Files are stored in Cloudinary and URLs are returned in the response 