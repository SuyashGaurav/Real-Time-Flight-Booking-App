let flightListing = [
    {
        name: "Indigo 6E442",
        from: "Patna",
        to: "Bangalore",
        price: 6000,
        start: new Date("2024-07-10T10:00:00"),
        end: new Date("2024-07-10T13:00:00"),
        date: new Date("2024-07-10"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Air India",
        from: "Goa",
        to: "Delhi",
        price: 4300,
        start: new Date("2024-07-12T14:00:00"),
        end: new Date("2024-07-12T16:30:00"),
        date: new Date("2024-07-12"),
        seats: Array(20).fill(0),
        locks: Array(20).fill(0)
    },
    {
        name: "SpiceJet SG301",
        from: "Mumbai",
        to: "Kolkata",
        price: 5500,
        start: new Date("2024-07-11T11:30:00"),
        end: new Date("2024-07-11T14:00:00"),
        date: new Date("2024-07-11"),
        seats: Array(15).fill(0),
        locks: Array(15).fill(0)
    },
    {
        name: "Vistara UK712",
        from: "Chennai",
        to: "Hyderabad",
        price: 4800,
        start: new Date("2024-07-13T09:00:00"),
        end: new Date("2024-07-13T11:00:00"),
        date: new Date("2024-07-13"),
        seats: Array(25).fill(0),
        locks: Array(25).fill(0)
    },
    {
        name: "GoAir G819",
        from: "Ahmedabad",
        to: "Pune",
        price: 3700,
        start: new Date("2024-07-14T15:00:00"),
        end: new Date("2024-07-14T17:00:00"),
        date: new Date("2024-07-14"),
        seats: Array(12).fill(0),
        locks: Array(12).fill(0)
    },
    {
        name: "Emirates EK512",
        from: "Dubai",
        to: "New York",
        price: 12000,
        start: new Date("2024-07-15T08:00:00"),
        end: new Date("2024-07-15T15:00:00"),
        date: new Date("2024-07-15"),
        seats: Array(300).fill(0),
        locks: Array(300).fill(0)
    },
    {
        name: "Qatar Airways QR101",
        from: "Doha",
        to: "London",
        price: 9500,
        start: new Date("2024-07-16T12:00:00"),
        end: new Date("2024-07-16T18:30:00"),
        date: new Date("2024-07-16"),
        seats: Array(250).fill(0),
        locks: Array(250).fill(0)
    },
    {
        name: "Lufthansa LH401",
        from: "Frankfurt",
        to: "Tokyo",
        price: 10500,
        start: new Date("2024-07-17T09:30:00"),
        end: new Date("2024-07-17T20:00:00"),
        date: new Date("2024-07-17"),
        seats: Array(200).fill(0),
        locks: Array(200).fill(0)
    },
    {
        name: "Singapore Airlines SQ308",
        from: "Singapore",
        to: "Sydney",
        price: 8900,
        start: new Date("2024-07-18T16:00:00"),
        end: new Date("2024-07-18T23:30:00"),
        date: new Date("2024-07-18"),
        seats: Array(180).fill(0),
        locks: Array(180).fill(0)
    },
    {
        name: "Air France AF202",
        from: "Paris",
        to: "Rome",
        price: 7200,
        start: new Date("2024-07-19T13:45:00"),
        end: new Date("2024-07-19T15:30:00"),
        date: new Date("2024-07-19"),
        seats: Array(150).fill(0),
        locks: Array(150).fill(0)
    },
    {
        name: "Etihad Airways EY401",
        from: "Abu Dhabi",
        to: "Tokyo",
        price: 9800,
        start: new Date("2024-07-20T11:00:00"),
        end: new Date("2024-07-20T21:00:00"),
        date: new Date("2024-07-20"),
        seats: Array(220).fill(0),
        locks: Array(220).fill(0)
    },
    {
        name: "AirAsia AK601",
        from: "Bangkok",
        to: "Kuala Lumpur",
        price: 3200,
        start: new Date("2024-07-21T07:30:00"),
        end: new Date("2024-07-21T09:30:00"),
        date: new Date("2024-07-21"),
        seats: Array(30).fill(0),
        locks: Array(30).fill(0)
    },
    {
        name: "Cathay Pacific CX301",
        from: "Hong Kong",
        to: "Singapore",
        price: 5800,
        start: new Date("2024-07-22T15:15:00"),
        end: new Date("2024-07-22T17:45:00"),
        date: new Date("2024-07-22"),
        seats: Array(50).fill(0),
        locks: Array(50).fill(0)
    },
    {
        name: "Thai Airways TG401",
        from: "Bangkok",
        to: "Seoul",
        price: 6900,
        start: new Date("2024-07-23T11:00:00"),
        end: new Date("2024-07-23T16:00:00"),
        date: new Date("2024-07-23"),
        seats: Array(40).fill(0),
        locks: Array(40).fill(0)
    },
    {
        name: "American Airlines AA101",
        from: "New York",
        to: "Los Angeles",
        price: 4800,
        start: new Date("2024-07-24T08:00:00"),
        end: new Date("2024-07-24T11:30:00"),
        date: new Date("2024-07-24"),
        seats: Array(100).fill(0),
        locks: Array(100).fill(0)
    },
    {
        name: "Virgin Atlantic VS202",
        from: "London",
        to: "Dubai",
        price: 8600,
        start: new Date("2024-07-25T13:00:00"),
        end: new Date("2024-07-25T20:00:00"),
        date: new Date("2024-07-25"),
        seats: Array(120).fill(0),
        locks: Array(120).fill(0)
    },
    {
        name: "KLM KL501",
        from: "Amsterdam",
        to: "Tokyo",
        price: 9400,
        start: new Date("2024-07-26T10:30:00"),
        end: new Date("2024-07-26T22:00:00"),
        date: new Date("2024-07-26"),
        seats: Array(180).fill(0),
        locks: Array(180).fill(0)
    },
    {
        name: "Turkish Airlines TK301",
        from: "Istanbul",
        to: "Moscow",
        price: 6200,
        start: new Date("2024-07-27T16:45:00"),
        end: new Date("2024-07-27T19:30:00"),
        date: new Date("2024-07-27"),
        seats: Array(80).fill(0),
        locks: Array(80).fill(0)
    },
    {
        name: "Air India AI101",
        from: "Mumbai",
        to: "Delhi",
        price: 7000,
        start: new Date("2024-07-01T09:00:00"),
        end: new Date("2024-07-01T11:30:00"),
        date: new Date("2024-07-01"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "SpiceJet SG123",
        from: "Goa",
        to: "Kolkata",
        price: 8000,
        start: new Date("2024-07-02T08:00:00"),
        end: new Date("2024-07-02T11:00:00"),
        date: new Date("2024-07-10"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Emirates EK500",
        from: "Dubai",
        to: "New York",
        price: 50000,
        start: new Date("2024-07-15T12:00:00"),
        end: new Date("2024-07-15T22:00:00"),
        date: new Date("2024-07-15"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Qatar Airways QR702",
        from: "Doha",
        to: "London",
        price: 45000,
        start: new Date("2024-07-17T13:00:00"),
        end: new Date("2024-07-17T20:00:00"),
        date: new Date("2024-07-17"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Lufthansa LH401",
        from: "Frankfurt",
        to: "Tokyo",
        price: 65000,
        start: new Date("2024-07-16T15:00:00"),
        end: new Date("2024-07-17T09:00:00"),
        date: new Date("2024-07-16"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Singapore Airlines SQ001",
        from: "Singapore",
        to: "Sydney",
        price: 40000,
        start: new Date("2024-07-03T17:00:00"),
        end: new Date("2024-07-04T01:00:00"),
        date: new Date("2024-07-03"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Air France AF256",
        from: "Paris",
        to: "Rome",
        price: 15000,
        start: new Date("2024-07-04T08:00:00"),
        end: new Date("2024-07-04T10:00:00"),
        date: new Date("2024-07-04"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Etihad EY101",
        from: "Abu Dhabi",
        to: "Bangkok",
        price: 35000,
        start: new Date("2024-07-05T06:00:00"),
        end: new Date("2024-07-05T14:00:00"),
        date: new Date("2024-07-05"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Malaysia Airlines MH123",
        from: "Kuala Lumpur",
        to: "Hong Kong",
        price: 25000,
        start: new Date("2024-07-25T09:00:00"),
        end: new Date("2024-07-25T12:00:00"),
        date: new Date("2024-07-25"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Korean Air KE707",
        from: "Seoul",
        to: "Los Angeles",
        price: 75000,
        start: new Date("2024-07-18T13:00:00"),
        end: new Date("2024-07-18T23:00:00"),
        date: new Date("2024-07-18"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "KLM KL702",
        from: "Amsterdam",
        to: "Istanbul",
        price: 28000,
        start: new Date("2024-07-20T16:00:00"),
        end: new Date("2024-07-20T20:00:00"),
        date: new Date("2024-07-20"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Aeroflot SU123",
        from: "Moscow",
        to: "Paris",
        price: 32000,
        start: new Date("2024-07-19T10:00:00"),
        end: new Date("2024-07-19T14:00:00"),
        date: new Date("2024-07-19"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Indigo 6E123",
        from: "Bangalore",
        to: "Hyderabad",
        price: 5000,
        start: new Date("2024-07-22T11:00:00"),
        end: new Date("2024-07-22T12:00:00"),
        date: new Date("2024-07-22"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Air India AI456",
        from: "Chennai",
        to: "Ahmedabad",
        price: 5500,
        start: new Date("2024-07-08T08:00:00"),
        end: new Date("2024-07-08T10:30:00"),
        date: new Date("2024-07-08"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "SpiceJet SG234",
        from: "Pune",
        to: "Goa",
        price: 4500,
        start: new Date("2024-07-09T09:00:00"),
        end: new Date("2024-07-09T10:30:00"),
        date: new Date("2024-07-09"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Emirates EK123",
        from: "Dubai",
        to: "Frankfurt",
        price: 52000,
        start: new Date("2024-07-21T07:00:00"),
        end: new Date("2024-07-21T13:00:00"),
        date: new Date("2024-07-21"),
        seats: Array(10).fill(0),
        locks: Array(10).fill(0)
    },
    {
        name: "Qatar Airways QR789",
        from: "Doha",
        to: "Tokyo",
        price: 60000,
        start: new Date("2024-07-01T08:00:00"),
        end: new Date("2024-07-01T18:00:00"),
        date: new Date("2024-07-01"),
        seats: Array(16).fill(0),
        locks: Array(16).fill(0)
    }
];


let sampleUsers = [
    {
        name : "Satyam",
        email : "satyamgaurav6040@gmail.com",
        password : "1234",
    }
]

export const flightListings = flightListing
export const userListings = sampleUsers