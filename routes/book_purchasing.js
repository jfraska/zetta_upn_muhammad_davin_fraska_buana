const express = require('express');

const router = express.Router();

router.post('/purchaseBook', (req, res) => {
    let { title, author, price, discountPercentage, taxPercentage, stock, amountPurchased, creditTerm } = req.body;   

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

    const discount = price * (discountPercentage / 100);
    const discountedPrice = price - discount;
    const subtotal = discountedPrice * totalPurchased;
    const taxAmount = subtotal * (taxPercentage / 100);
    const totalPrice = subtotal + taxAmount;

    const pricePerCredit = totalPrice / creditTerm;
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
          discountedPrice,
          subtotal,
          taxAmount,
          totalPrice,
          creditTerm,
          creditDue,
        },
        canPurchaseMore: stock > 0,
    });

});
  
module.exports = router;