const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");

exports.createCheckoutSession = async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("❌ STRIPE_SECRET_KEY is missing from .env");
    return res.status(500).json({ message: "Payment configuration missing" });
  }
  try {
    const { tutorName, salary, tutorId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: { name: `Hiring Tutor: ${tutorName}` },
            unit_amount: Math.round(Number(salary) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/student-dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/tutor/${tutorId}`,
      customer_email: req.user.email,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: error.message });
  }
};
