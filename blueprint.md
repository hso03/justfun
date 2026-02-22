
# Naver Finance Discussion Board Crawler

## Overview

This project is a web application that crawls and displays discussions from the Naver Finance stock discussion board. It provides a user-friendly interface to view the latest topics and discussions for various stocks.

## Features

- Crawls and displays a list of discussion topics from Naver Finance.
- Provides a clean and modern user interface.
- Allows users to select a stock to view discussions for (future feature).
- Search functionality for topics (future feature).

## Tech Stack

- **Frontend:** React, Vite, Material-UI (MUI), Axios
- **Backend:** Node.js, Express, Cheerio, Axios, CORS

## Plan

1.  **Backend Development:**
    - Set up an Express server.
    - Create an API endpoint to crawl the Naver Finance discussion board.
    - Use `axios` to fetch the HTML of the discussion board page.
    - Use `cheerio` to parse the HTML and extract the discussion topics.
    - Send the extracted data as a JSON response.

2.  **Frontend Development:**
    - Install necessary packages: `@mui/material`, `@emotion/react`, `@emotion/styled`, and `axios`.
    - Create a new component `DiscussionBoard.jsx` to display the crawled data.
    - Use MUI components like `Container`, `Typography`, `List`, `ListItem`, `ListItemText` to build the UI.
    - In `App.jsx`, fetch the data from the backend API using `axios`.
    - Pass the fetched data to the `DiscussionBoard.jsx` component.
    - Implement a loading state while fetching data.
    - Add basic error handling.

3.  **Integration and Configuration:**
    - Add a proxy to `vite.config.js` to forward API requests to the backend server during development.
    - Add a script to `package.json` to run the backend server concurrently with the frontend dev server.

