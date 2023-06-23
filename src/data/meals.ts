import {
  avocadoToast,
  classicBurger,
  eggsBenedict,
  pancakes,
  peperoniPizza,
  salad,
  seafood,
  vegeterianPizza,
  vegyBurger,
} from "../assets";

export const menu = [
  {
    category: "Burger",
    items: [
      {
        name: "Classic Burger",
        description: "Juicy beef patty with lettuce, tomato, and cheese",
        price: 9.99,
        rating: 4.5,
        img: classicBurger,
      },
      {
        name: "Vegetarian Burger",
        description: "Grilled vegetable patty with avocado and sprouts",
        price: 8.99,
        rating: 4.2,
        img: vegyBurger,
      },
    ],
  },
  {
    category: "Pizza",
    items: [
      {
        name: "Margherita Pizza",
        description:
          "Classic pizza topped with tomato sauce, mozzarella, and basil",
        price: 12.99,
        rating: 4.7,
        img: vegeterianPizza,
      },
      {
        name: "Pepperoni Pizza",
        description: "Pizza loaded with pepperoni slices and cheese",
        price: 13.99,
        rating: 4.6,
        img: peperoniPizza,
      },
      {
        name: "Vegetarian Pizza",
        description: "Pizza topped with a variety of fresh vegetables",
        price: 11.99,
        rating: 4.3,
        img: vegeterianPizza,
      },
    ],
  },
  {
    category: "Breakfast",
    items: [
      {
        name: "Eggs Benedict",
        description: "Poached eggs with hollandaise sauce on an English muffin",
        price: 9.99,
        rating: 4.4,
        img: eggsBenedict,
      },
      {
        name: "Pancakes",
        description: "Fluffy pancakes served with maple syrup",
        price: 8.99,
        rating: 4.1,
        img: pancakes,
      },
      {
        name: "Avocado Toast",
        description:
          "Toasted bread topped with mashed avocado and cherry tomatoes",
        price: 7.99,
        rating: 4.0,
        img: avocadoToast,
      },
    ],
  },
  {
    category: "Salad",
    items: [
      {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with parmesan cheese and croutons",
        price: 8.99,
        rating: 4.3,
        img: salad,
      },
      {
        name: "Greek Salad",
        description:
          "Fresh salad with tomatoes, cucumbers, olives, and feta cheese",
        price: 9.99,
        rating: 4.2,
        img: salad,
      },
      {
        name: "Cobb Salad",
        description:
          "Mixed greens topped with grilled chicken, bacon, avocado, and blue cheese",
        price: 10.99,
        rating: 4.5,
        img: salad,
      },
    ],
  },
  {
    category: "Seafood",
    items: [
      {
        name: "Grilled Salmon",
        description: "Grilled salmon fillet served with lemon butter sauce",
        price: 16.99,
        rating: 4.7,
        img: seafood,
      },
      {
        name: "Shrimp Scampi",
        description: "Sautéed shrimp in garlic butter sauce, served with pasta",
        price: 14.99,
        rating: 4.4,
        img: seafood,
      },
      {
        name: "Lobster Roll",
        description:
          "Toasted bun filled with lobster meat tossed in mayonnaise",
        price: 18.99,
        rating: 4.6,
        img: seafood,
      },
    ],
  },
];
