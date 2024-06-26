export const mockPriceData = [
  {
    plan: "Basic",
    price: 29,
    ptext: "per user, per month",
    features: [
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "99.5% Uptime Guarantee" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "120GB CDN Bandwidth" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "5GB Cloud Storage" },
      { icon: JSON.stringify('<i class="fa-solid fa-x"></i>'), text: "Personal Help Support", change: "color" },
      { icon: JSON.stringify('<i class="fa-solid fa-x"></i>'), text: "Enterprise SLA", change: "color" },
    ]
  },
  {
    best: "Best Value",
    plan: "Standard",
    price: 49,
    ptext: "per user, per month",
    features: [
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "99.5% Uptime Guarantee" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "150GB CDN Bandwidth" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "10GB Cloud Storage" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Personal Help Support" },
      { icon: JSON.stringify('<i class="fa-solid fa-x"></i>'), text: "Enterprise SLA", change: "color" },
    ]
  },
  {
    plan: "Platinum",
    price: 79,
    ptext: "2 user, per month",
    features: [
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "100% Uptime Guarantee" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "200GB CDN Bandwidth" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "20GB Cloud Storage" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Personal Help Support" },
      { icon: JSON.stringify('<i class="fa-solid fa-check"></i>'), text: "Enterprise SLA" },
    ]
  },
];