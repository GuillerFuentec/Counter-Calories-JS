
```markdown
# Date Formatter Project

This simple web application allows users to display and customize the current date based on different format options.

## Features

- Display the current date in a default format (day-month-year).
- Customize the date format through a dropdown menu.
- Support for multiple date format options.

## Usage

1. Open the `index.html` file in a web browser.
2. Explore the default date display.
3. Use the dropdown menu to select different date format options.
4. Observe the updated date display based on your selection.

## Code Explanation

The JavaScript code in `script.js` does the following:

- Retrieves HTML elements for displaying the current date and the date format options.
- Gets the current date and time using the `Date` object.
- Formats the date based on the default format (day-month-year) and displays it.
- Listens for changes in the dropdown menu (`date-optionsSelectElement`) and updates the displayed date accordingly.

## Example

Below is a code snippet demonstrating the core functionality:

```javascript
const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// ... (rest of your JavaScript code)
```

## License

This project is licensed under the [MIT License](LICENSE.md).

Feel free to modify this README according to your project's specific details and requirements.