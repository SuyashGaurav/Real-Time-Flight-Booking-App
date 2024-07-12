# [✈️ Real-Time Flight Booking Website](https://real-time-flight-booking-app.vercel.app/)
![image](https://github.com/user-attachments/assets/883dcf7d-3b7e-4dd4-86e4-a3257c595b38)

## Project Description
- A full-stack web application for booking flights in real-time, built using the MERN stack. The application features Google OAuth2 for authentication, Razorpay for payment integration, and a mutual exclusion mechanism to ensure that only one user can book a particular seat at a time.

<div>
  <h2><img src="https://github.com/SuyashGaurav/WanderLust-Airbnb-Clone/assets/102952185/2a0317ea-4b6a-42d8-98a4-c76b855bfabf" width="35" height="35"> Features</h2>
</div>
<ul>
<li><b>Google OAuth2 Sign-In:</b> Secure login using Google accounts.</li>
<li><b>Payment Integration:</b> Seamless payment processing with Razorpay.</li>
<li><b>Mutual Exclusion Mechanism using Locks:</b> Ensures that a seat can only be booked by one user at a time.
  <hr />
<b>Explaination</b>: The mutual exclusion mechanism ensures that if two or more users try to book the same seat, only one will be allowed to do so. If the first user's payment is successful, the seat is marked as booked and unavailable for others. If the payment fails or the user does not complete the booking, the lock is released, allowing other users to book the seat.
</li>
<li><b>Real-Time Updates:</b> Seats are updated in real-time to reflect availability.</li>
<li><b>Flight Filtering:</b> Users can filter flights based on origin, destination, and date. </li>
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

![image](https://github.com/user-attachments/assets/a1f5961d-ba83-4fd3-b278-236c1ff16037)
![image](https://github.com/user-attachments/assets/5eff8d1c-6913-48cf-9e11-65a2e9fac405)
![image](https://github.com/user-attachments/assets/c54962c0-ff14-4690-b04f-f0b414f8735e)



