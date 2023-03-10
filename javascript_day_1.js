function purchaseBook(book, discountPercentage, taxPercentage) {
  // Calculate the amount of discount
  const discount = book.price * (discountPercentage / 100);

  // Calculate the price after discount
  const priceAfterDiscount = book.price - discount;

  // Calculate the amount of tax
  const tax = priceAfterDiscount * (taxPercentage / 100);

  // Calculate the price after tax
  const priceAfterTax = priceAfterDiscount + tax;

  // Display all the parameters with additional data
  console.log(`Book: ${book.title} by ${book.author}`);
  console.log(`Price: ${book.price.toFixed(2)}`);
  console.log(`Discount: ${discount.toFixed(2)} (${discountPercentage}%)`);
  console.log(`Price after discount: ${priceAfterDiscount.toFixed(2)}`);
  console.log(`Tax: ${tax.toFixed(2)} (${taxPercentage}%)`);
  console.log(`Price after tax: ${priceAfterTax.toFixed(2)}`);
}

const book = {
  title: "buku pemograman ray",
  author: "ray",
  price: 10000,
};

purchaseBook(book, 20, 5);
