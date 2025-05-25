import { Product } from "@/app/products/page";

export const anneContactEmail = process.env.NEXT_PUBLIC_ANNE_CONTACT_EMAIL;
export const annePartnershipEmail =
  process.env.NEXT_PUBLIC_ANNE_PARTNERSHIP_EMAIL;

// Sample products
export const products: Product[] = [
  {
    id: "1",
    title: "5 Investments You Can Start with 10,000 Naira",
    price: "₦2,500",
    discountPrice: "₦4,999",
    originalPrice: "₦10,000",
    category: "e-book",
    image: "/products/freelancing-guide.PNG",
    externalUrl: "https://selar.com/f54299",
    description: `Are you looking to grow your wealth but think investing is only for the rich? Think again! In this e-book, "5 Investments You Can Start with 10,000 Naira," I’ll show you how to start small and build a foundation for financial freedom.

This guide is packed with practical, low-cost investment options that anyone can start today, even with limited capital. From High Yield Savings Platforms to Stock Market Investments, each chapter is designed to empower you with actionable steps and valuable insights.

What's Inside:
- Five easy-to-start investments, perfect for beginners. Legitimate and licensed by the appropriate government authorities.
- Step-by-step guides, resources and tips to help you grow your money.
- Real-life examples and success stories to inspire your journey.

Why You’ll Love This E-book:
- Affordable: All investments can be made with 10,000 Naira or less.
- Actionable: Each section gives you clear steps to get started right away.
- Engaging and Easy to Understand: Written in a simple, approachable style even for beginners.

Are you ready to take charge of your financial future?
With this e-book, you'll learn how to turn your small savings into big opportunities. Get your copy today and start investing with confidence!`,
  },
  {
    id: "2",
    title: "One-on-One Financial Coaching Call",
    price: "₦10,000",
    discountPrice: "₦50,000",
    originalPrice: "₦100,000",
    category: "coaching",
    image: "/products/financial-coaching.PNG",
    externalUrl: "https://selar.com/1b8204",
    description: `Are you ready to take control of your finances and achieve your financial goals? My one-on-one coaching call is designed to provide you with the personalized guidance and actionable strategies you need to succeed.

What You'll Get

1. 60-Minute Coaching Session:
- A full hour dedicated to addressing your unique financial situation and goals.

2. Personalized Financial Assessment:
- A detailed review of your current financial status, including income, expenses, savings, debts, and investments.

3. Customized Action Plan:
- A step-by-step plan tailored specifically to your financial goals, whether it is increasing your income, debt reduction, saving better, investment strategies or budgeting.

4. Goal Setting and Strategy Development:
- Assistance in defining clear, achievable financial goals and creating strategies to reach them.

5. Budget Optimization:
- Tips and tools to help you create and maintain an effective budget that maximizes your savings and minimizes unnecessary expenses.

6. Debt Management Advice:
- Strategies to pay down debt more efficiently, including prioritizing high-interest debts and exploring consolidation options.

7. Investment Guidance:
- Personalized advice on building or optimizing your investment portfolio based on your risk tolerance and financial goals.

8. Expense Tracking Tools:
- Recommendations for apps and methods to help you track your spending and stay on budget.

9. Savings Plan:
- Techniques to increase your savings rate and build an emergency fund.

10. Follow-Up Support:
- One week of support after the session to answer any additional questions and ensure you’re on the right track.

11. Resource Recommendations:
- Access to a curated list of books, websites, and tools to further enhance your financial knowledge.

12. Accountability Check-In:
- A scheduled follow-up call to check on your progress and adjust your plan as needed.

Why Choose Me?

As a seasoned finance coach with years of experience, I've helped many men and women just like you achieve financial success. My approach is personalized, empathetic, and results-driven. I am committed to helping you unlock your full financial potential.

Limited-Time Offer

Book your one-hour coaching call today and receive an exclusive 50% discount. Don't miss out on this opportunity to transform your financial future!

After payment, you will be redirected to my Whatsapp where we will fix the time and date for your call.

Thank you.`,
  },
];
