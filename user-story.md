# GiftLink User Stories

## User Story Template

As a **[type of user]**, I want **[some goal]** so that **[some reason]**.

## Details and Assumptions

- GiftLink helps people donate and reuse household goods.
- Users can browse gifts without logging in, but registration and login are required for account-specific features.
- MongoDB stores gifts, users, comments, and profile information.
- The frontend is built with React and the backend is built with Node.js and Express.
- JWT authentication protects user-specific profile actions.

## Acceptance Criteria

Given a visitor opens GiftLink, when they browse available items, then they can see reusable household gifts.

Given a new user submits valid registration details, when the API receives the request, then the user account is created and an auth token is returned.

Given a registered user logs in with valid credentials, when authentication succeeds, then GiftLink stores the JWT token for later requests.

Given a user searches by category, when matching gifts exist, then the matching items are returned.

Given a user views an item, when the gift ID exists, then the item detail page shows the full gift information.

## Stories

1. As a visitor, I want to view available household gifts so that I can find reusable items.
2. As a registered user, I want to log in securely so that I can manage my profile.
3. As a user, I want to register with my details so that I can access GiftLink features.
4. As a user, I want to search gifts by category so that I can quickly find relevant items.
5. As a user, I want to view gift details so that I can decide whether an item is useful.
6. As a donor, I want to list gifts so that other people can reuse them.
7. As a user, I want to leave comments so that I can share feedback about items.
8. As a user, I want to update my profile so that my information remains current.
