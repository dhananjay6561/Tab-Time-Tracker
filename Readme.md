# Tab Time Tracker

## Overview

Tab Time Tracker is a Chrome extension designed to monitor and record the time spent on individual browser tabs. This tool provides users with insights into their browsing habits and time allocation across different websites.

## Features

- Real-time tracking of active tab duration
- Persistent storage of time data across browser sessions
- User-friendly popup interface displaying time spent on the current tab
- Comparison table showing time spent across all tabs
- Background processing to ensure accurate timing even when the popup is closed

## Technical Implementation

The extension is built using standard web technologies and the Chrome Extension API:

- JavaScript for core functionality and time calculations
- HTML and CSS for the popup interface
- Chrome Extension APIs for tab management and data persistence

Key components:

1. `background.js`: Handles core timing logic and tab event listeners
2. `popup.js`: Manages the user interface and time display updates
3. `popup.html`: Defines the structure of the popup interface
4. `manifest.json`: Specifies extension metadata and permissions

## Installation

To install the extension for development:

1. Clone the repository:
   ```bash
   git clone https://github.com/dhananjay6561/tab-time-tracker.git
   ```
2. Navigate to `chrome://extensions/` in the Chrome browser
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files

## Usage

After installation, the extension will automatically begin tracking tab usage. To view the time spent on tabs:

1. Click the extension icon in the Chrome toolbar
2. The popup will display:
   - Time spent on the active tab
   - A table comparing time spent across all tabs

## Development

To modify or extend the extension:

1. Edit the relevant files (`background.js`, `popup.js`, `popup.html`, `manifest.json`)
2. Save changes
3. Return to the `chrome://extensions/` page
4. Click the refresh icon on the extension's card to reload it

## Permissions

The extension requires the following permissions:

- `tabs`: To access and monitor tab activity
- `storage`: To persist timing data

These permissions are declared in the `manifest.json` file.

## Data Storage

Time data is stored using Chrome's `storage.local` API. This ensures data persistence across browser sessions while keeping the information local to the user's device.

## Limitations

- The extension only tracks time when Chrome is open and the user is actively using the browser
- Time tracking may be less accurate during periods of system sleep or when Chrome is in the background

## Future Updates

The Tab Time Tracker project has plans for significant enhancements to provide users with more detailed insights and improved data visualization. Key planned features include:

### Graphical Analysis

1. Time Distribution Graphs:
   - Implement interactive pie charts to visualize the proportion of time spent on different websites.
   - Develop bar graphs to show daily, weekly, and monthly usage patterns.

2. Trend Analysis:
   - Create line graphs to display usage trends over time, allowing users to track changes in their browsing habits.

3. Category-based Tracking:
   - Introduce a system to categorize websites (e.g., productivity, entertainment, social media).
   - Generate stacked bar charts to show time allocation across different categories.

### Enhanced Data Processing

1. Data Export Functionality:
   - Implement features to export tracking data in common formats (CSV, JSON) for external analysis.

2. Statistical Analysis:
   - Provide basic statistical measures such as average time per site, most visited sites, and peak usage times.

### User Interface Improvements

1. Dashboard:
   - Develop a comprehensive dashboard integrating various graphs and statistics for at-a-glance insights.

2. Customizable Views:
   - Allow users to customize which graphs and metrics are displayed based on their preferences.

3. Responsive Design:
   - Ensure all new graphical elements are responsive and function well across different screen sizes.

These planned updates aim to transform the Tab Time Tracker from a simple time-tracking tool into a comprehensive platform for analyzing and understanding browsing habits. The integration of graphical elements will provide users with intuitive visual representations of their data, facilitating better insights and potentially aiding in productivity management.

## Contributing

Contributions to the Tab Time Tracker project are welcome. Here's how you can contribute:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/your-feature-name
   ```
   or
   ```
   git checkout -b fix/your-bug-fix
   ```
4. Make your changes and commit them with a clear, descriptive commit message.
5. Push your changes to your fork on GitHub:
   ```
   git push origin feature/your-feature-name
   ```
6. Open a pull request from your fork to the main repository.
7. Provide a clear description of the changes and any relevant issue numbers in the pull request description.

### Contribution Guidelines

- Ensure your code adheres to the existing style of the project to maintain consistency.
- Update the README.md with details of changes to the interface, if applicable.
- Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
- You may merge the Pull Request once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Reporting Issues

If you find a bug or have a suggestion for improving the extension:

1. Check the GitHub Issues to see if the bug or suggestion has already been reported.
2. If not, open a new issue, providing as much relevant information as possible.
3. For bugs, describe the issue in detail, including steps to reproduce, expected behavior, and actual behavior.
4. For feature suggestions, explain the proposed feature and its potential benefits.



Thank you for your interest in improving Tab Time Tracker!