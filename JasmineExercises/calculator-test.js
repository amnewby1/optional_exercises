it("should calculate the monthly rate correctly", function () {
  let values = { amount: 10000, years: 8, rate: 5.8 };
  expect(calculateMonthlyPayment(values)).toEqual("130.44");
  // ...
});

it("should return a result with 2 decimal places", function () {
  let values = { amount: 100000, years: 20, rate: 5 };
  expect(calculateMonthlyPayment(values)).toBeCloseTo(659.96, 2);
  // ..
});

/// etc
