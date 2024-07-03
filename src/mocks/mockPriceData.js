export const mockPriceData = [
  {
    plan: "Basic",
    price: 29,
    ptext: "per user, per month",
    features: [
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Access Basic Listings" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Publish 10 Listings" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Email Support" },
      { icon: JSON.stringify('<i class="fa-solid fa-x"></i>'), text: "Phone Support", change: "color" },
      { icon: JSON.stringify('<i class="fa-solid fa-x"></i>'), text: "Market Analysis", change: "color" },
    ]
  },
  {
    best: "Best Value",
    plan: "Standard",
    price: 49,
    ptext: "per user, per month",
    features: [
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Access All Listings" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Publish 50 Listings" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Email and Chat" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Phone Support" },
      { icon: JSON.stringify('<i class="fa-solid fa-x"></i>'), text: "Market Analysis", change: "color" },
    ]
  },
  {
    plan: "Platinum",
    price: 79,
    ptext: "2 user, per month",
    features: [
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Unlimited Listings" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Full Market Access" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Email, Chat, Phone" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Personal Phone Support" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Market Analysis" },
    ]
  },
];