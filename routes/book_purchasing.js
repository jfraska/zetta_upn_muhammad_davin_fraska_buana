const express = require('express');

const router = express.Router();

async function calculateTermPrice(bookPrice, discountPercentage, taxPercentage, creditTerm, totalPurchased) {
  const discount = bookPrice * (discountPercentage / 100);
  const discountedPrice = bookPrice - discount;
  const subtotal = discountedPrice * totalPurchased;
  const taxAmount = subtotal * (taxPercentage / 100);
  const totalPrice = subtotal + taxAmount;

  return totalPrice / creditTerm;
}

router.post('/purchaseBook', async (req, res) => {
  let { title, author, price, discountPercentage, taxPercentage, stock, amountPurchased, creditTerm, additionalPrice} = req.body;   

  if (amountPurchased > stock) {
      res.status(400).json({ message: `Not enough stock available for ${title}.` });
      return;
  }

  let totalPurchased = 0;
  for (let i = 0; i < amountPurchased; i++) {
      if (stock <= 0) {
          res.status(400).json({ message: `Cannot purchase more ${title}. Stock is exhausted.` });
          break;
      }

      totalPurchased++;
      stock--;
  }

  let pricePerCredit = await calculateTermPrice(price, discountPercentage, taxPercentage, creditTerm, totalPurchased);
  if (additionalPrice) {
    pricePerCredit += additionalPrice;
  }

  const totalPrice = pricePerCredit * creditTerm;
  const creditDue = Array.from({ length: creditTerm }, (_, i) => {
      return {
        month: i + 1,
        price: (i === creditTerm - 1) ? totalPrice - (pricePerCredit * (creditTerm - 1)) : pricePerCredit
      };
  });

  res.json({
      bookDetails: {
        title,
        author,
        price,
        discountPercentage,
        taxPercentage,
        stock,
        amountPurchased,
      },
      paymentDetails: {
        totalPrice,
        creditTerm,
        creditDue,
      },
      canPurchaseMore: stock > 0,
  });

});
  
module.exports = router;