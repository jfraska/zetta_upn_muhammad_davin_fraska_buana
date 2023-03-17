function purchaseBook(book, discountPercentage, taxPercentage, stock, amountPurchased) {
  // Check if book is out of stock
  if (stock === 0) {
    console.log(`Sorry, ${book.title} is out of stock.`);
    return;
  }

  // Calculate the amount of discount
  const discount = book.price * (discountPercentage / 100);

  // Calculate the price after discount
  const priceAfterDiscount = book.price - discount;

  // Calculate the amount of tax
  const tax = priceAfterDiscount * (taxPercentage / 100);

  // Calculate the price after tax
  const priceAfterTax = priceAfterDiscount + tax;

  // Check if there is enough stock for the purchase
  if (amountPurchased > stock) {
    console.log(`Sorry, there are only ${stock} copies of ${book.title} left.`);
    return;
  }

  // Update stock and total price
  let totalPrice = 0;
  for (let i = 1; i <= amountPurchased; i++) {
    if (stock === 0) {
      console.log(`Sorry, ${book.title} is now out of stock.`);
      break;
    }
    stock--;
    totalPrice += priceAfterTax;
  }

  // Display all the parameters with additional data
  console.log(`Book: ${book.title} by ${book.author}`);
  console.log(`Price: ${book.price.toFixed(2)}`);
  console.log(`Discount: ${discount.toFixed(2)} (${discountPercentage}%)`);
  console.log(`Price after discount: ${priceAfterDiscount.toFixed(2)}`);
  console.log(`Tax: ${tax.toFixed(2)} (${taxPercentage}%)`);
  console.log(`Price after tax: ${priceAfterTax.toFixed(2)}`);
  console.log(`Amount purchased: ${amountPurchased}`);
  console.log(`Total price: ${totalPrice.toFixed(2)}`);

  // Check if there is still stock left for the purchase
  if (stock > 0) {
    console.log(`There are still ${stock} copies of ${book.title} left.`);
  } else {
    console.log(`Sorry, ${book.title} is now out of stock.`);
  }
}

const book = {
  title: "buku pemograman ray",
  author: "ray",
  price: 10000,
};

purchaseBook(book, 20, 5, 10, 5);
