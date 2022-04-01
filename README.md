# ResearchOrSwim

ReserchOrSwim is a stock investing analytics dashboard based on 3 investing principles - price momentum, earning fundamentals and Wall Street sentiments. It simplified your investment research process as it's just simple as just one click away.

---

[Checkout the Live Site](https://swusteven.github.io/ResearchOrSwim/)

---

**Functionalities:**

The ResearchOrSwim dashboard consists of the following features:

- 1-year historical price chart with a 30-days moving average to gauge price momentum.
- Yearly earnings to gauge earning strength.
- Wall Street recommendations to gauge sentiments.
- ResearchOrSwim Recommendations.
  - A 'buy' recommendation only if that specific stock passed ALL of the following 3 investing principles.
    1. Price Momentum: passed only if price moving average from last 30 days is increasing.
    2. Company Earnings: passed only if earning is positive in the last two years and YoY growth was 10% or more.
    3. Wall Street Analysts Recommendations: passed only if 50% of the overall analysts recommended a Strong Buy or Buy.

---

**User Interactions**

<img src="https://media.giphy.com/media/x5TX2hUtwtEKXAxv8o/giphy.gif"/>

---

**Technologies, Libraries, APIs**

- **JavaScript**: Overall project was built with JavaScript, following are some highlights:

  - Fetch and Promises: manage asynchronous operation from multiple APIs and its resulting value.
  - Document Object Model(DOM) for element manipulations.
  - EventTarget: objects that can receive events and may have listeners for them.
  - Modals: dialog box/popup window that is displayed on top of the current page.

- **D3.js library**: Render dynamic and interactive charts upon every new search.

  - Create a line chart with moving average.
  - Create a Bar chart with animations.

- **IEXcloud and FinHub APIs**: - stock data APIs for stock data including histirical price, analyst recommendations and earnings.

- **HTML and CSS**: for web structure and styling.

- **Webpack**: for bundle JavaScript files.

---
