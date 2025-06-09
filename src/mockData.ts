export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  totalSeats: number;
  bookedSeats: number;
  organizer: string;
}

export interface Booking {
  id: number;
  userId: number;
  eventId: number;
  bookingDate: string;
}

export const users: User[] = [
  { id: 1, name: "Aditi Sharma", email: "aditi.sharma@example.com" },
  { id: 2, name: "Rahul Verma", email: "rahul.verma@example.com" },
  { id: 3, name: "Priya Patel", email: "priya.patel@example.com" }
];

export const events: Event[] = [
  {
    id: 101,
    title: "Tech Summit 2025",
    description: "Join us for an exciting tech conference with industry leaders. Experience cutting-edge technologies and network with professionals.",
    date: "Jul 15, 2025",
    time: "10:00 AM",
    location: "Dubai",
    price: 541,
    image: "/techfest.png",
    totalSeats: 100,
    bookedSeats: 2,
    organizer: "Gullie Global Community Events"
  },
  {
    id: 102,
    title: "Startup Networking",
    description: "Network with fellow entrepreneurs and investors. Learn about innovative startup ideas and explore collaboration opportunities.",
    date: "Jul 20, 2025",
    time: "2:00 PM",
    location: "Silicon Valley",
    price: 0,
    image: "/startupTalk.png",
    totalSeats: 50,
    bookedSeats: 45,
    organizer: "Startup Hub"
  },
  {
    id: 103,
    title: "AI & ML Workshop",
    description: "Hands-on workshop on the latest AI and Machine Learning technologies. Perfect for developers and tech enthusiasts.",
    date: "Aug 1, 2025",
    time: "9:00 AM",
    location: "New York",
    price: 299,
    image: "/techfest.png",
    totalSeats: 30,
    bookedSeats: 30,
    organizer: "Tech Learning Hub"
  }
];

export const bookings: Booking[] = [
  {
    id: 501,
    userId: 1,
    eventId: 101,
    bookingDate: "2025-06-01T10:30:00"
  },
  {
    id: 502,
    userId: 2,
    eventId: 102,
    bookingDate: "2025-06-02T14:15:00"
  },
  {
    id: 503,
    userId: 3,
    eventId: 103,
    bookingDate: "2025-06-03T09:45:00"
  }
];