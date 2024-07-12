# [✈️ Real-Time Flight Booking Website](https://real-time-flight-booking-app.vercel.app/)

## Project Description
- A full-stack web application for booking flights in real-time, built using the MERN stack. The application features Google OAuth2 for authentication, Razorpay for payment integration, and a mutual exclusion mechanism to ensure that only one user can book a particular seat at a time.

<div>
  <h2><img src="https://github.com/SuyashGaurav/WanderLust-Airbnb-Clone/assets/102952185/2a0317ea-4b6a-42d8-98a4-c76b855bfabf" width="35" height="35"> Features</h2>
</div>
<ul>
<li>**Google OAuth2 Sign-In:** Secure login using Google accounts.</li>
<li>**Payment Integration:** Seamless payment processing with Razorpay.</li>
<li>**Mutual Exclusion Mechanism using Locks:** Ensures that a seat can only be booked by one user at a time.
**Explaination**: The mutual exclusion mechanism ensures that if two or more users try to book the same seat, only one will be allowed to do so. If the first user's payment is successful, the seat is marked as booked and unavailable for others. If the payment fails or the user does not complete the booking, the lock is released, allowing other users to book the seat.
</li>
<li>**Real-Time Updates:** Seats are updated in real-time to reflect availability.</li>
<li>**Flight Filtering:** Users can filter flights based on origin, destination, and date. </li>
</ul>

## Deployment
The application is deployed on Vercel. You can access the live version [here](https://real-time-flight-booking-app.vercel.app/).

## Backend
- The backend is built using Node.js, Express, and MongoDB. It handles user authentication, flight data, and payment processing.

- Set up environment variables:
Create a .env file in the backend directory and add your configurations:
```
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
MONGO_URL=your-mongodb-url
SESSION_KEY=your-session-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

## Frontend
- The frontend is built using React. It provides the user interface for logging in, viewing available flights, booking seats, and processing payments.

