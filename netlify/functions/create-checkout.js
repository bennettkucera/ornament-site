const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const items = JSON.parse(event.body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.name },
        unit_amount: i.price * 100
      },
      quantity: 1
    })),
    mode: 'payment',
    success_url: 'https://yoursite.netlify.app/success',
    cancel_url: 'https://yoursite.netlify.app/shop'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url })
  };
};
