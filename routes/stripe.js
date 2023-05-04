import { Stripe } from "stripe";

const stripe = Stripe(
  "sk_test_51MkPp3SHbnXtAyY6SLGpkY0C1bjlhN8CDKHyHCcDvakOut5JrVfIeJCPgDJDaNH9i2ZZ0UeZs7ORS0oC1rGpsLGK00awqgEN7n"
);
import express from "express";
import { Router } from "express";
const stripeRouter = express.Router();
stripeRouter.post("/create-checkout-session", async (req, res) => {
  //console.log("OK");
  const info = req.body.info;
  //console.log(process.env.SECRET_KEY);

  const line_items = req.body.cartItems.map((item) => {
    console.log(item.price);
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          //images: [item.image],
          //description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: +(item.price * 100),
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
   
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    //customer: "OK",
    success_url: `http://localhost:3000/profile/cart/success`,
    cancel_url: `http://localhost:3000/profile/cart/fail`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});

export default stripeRouter;
