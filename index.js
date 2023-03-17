function purchaseBook(book, discountPercentage, taxPercentage, stock, amountPurchased, term) {
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
  let creditPrice = priceAfterTax / term.length;
  let creditArray = [];

  for (let i = 0; i < term.length; i++) {
    if (stock === 0) {
      console.log(`Sorry, ${book.title} is now out of stock.`);
      break;
    }
    stock--;
    totalPrice += creditPrice;
    creditArray.push({
      month: i + 1,
      price: creditPrice.toFixed(2)
    });
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

  // Display the credit price for each term as an array
  console.log(`Credit price for each term:`);
  console.table(creditArray);

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

purchaseBook(book, 20, 5, 10, 5, [1, 2, 3, 4, 5]); // Example usage with 5 terms of credit
