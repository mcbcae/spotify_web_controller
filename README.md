# Spotify Web Controller
A web controller for Spotify, targeted for Android Go, because I've heard the official Spotify application runs like shit and sometimes you just wanna control what's playing without getting up from bed or something

It's currently available at https://freekb.es/spotify/

*Reminder that you need to open Spotify on another device in order for this to function correctly (or the same one, actually, but why would you do that)*

## Running Locally

To run this project on your machine:


1.  **Prerequisites**:
    *   **Desktop**: A simple static file server (e.g., Python `http.server`, `http-server` via npm, or Caddy).
    *   **Android**: A static server app (e.g., "Simple HTTP Server" or similar from Play Store/F-Droid).
2.  **Spotify App Setup**:
    *   Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
    *   Log in with your Spotify account.
    *   Click **"Create app"**.
    *   Enter an **App name** (e.g., "My Web Controller") and **App description**.
    *   In **Redirect URIs**, enter exactly:
        ```
        http://127.0.0.1:8000/
        ```
        *Note: If running on a real Android device, checking localhost might be tricky. You usually need to use the device's IP address (e.g. `http://192.168.1.50:8000/`) and add THAT to the Spotify Dashboard Redirect URIs.*
    *   Check the "I understand" box and click **Save**.
    *   Click on **Settings** in your new app.
    *   Copy the **Client ID**.

3.  **Configure App**:
    *   Open `spotify-handler.js` in this project.
    *   Find the line `clientId: "...";`.
    *   Replace the string with your new **Client ID**.
    *   **Important for Android**: If accessing from another device or using a specific IP, ensure `redirectUri` matches exactly what is in your Dashboard. The code automatically uses the current browser URL, so just ensure the Dashboard matches what you type in the browser.

4.  **Start Server**:
    *   **Python**: `python3 -m http.server 8000`
    *   **PHP**: `php -S 0.0.0.0:8000`
    *   **Android**: Point your HTTP Server app to the `spotify_web_controller` folder and start it on port 8000.
5.  **Access the App**:
    Open `http://localhost:8000` (or your device IP) in your web browser.

> **Note**: This project now uses **Authorization Code Flow with PKCE**, which requires a specific Redirect URI setup. Ensure you access the site via the exact URI you registered (e.g., `127.0.0.1` vs `localhost`).

## Supported features
- an overview of the user's library: playlists and saved albums
- searching for songs, albums and playlists
- overview of all songs in the album/playlist that's currently being played (a replacement for the queue, as the queue is sadly not fetchable with Spotify's API)
- changing the playback volume
- switching between devices using Spotify Connect
- liking and unliking the currently playing song
- enabling and disabling shuffle, repeat

## Possible features that I might add one day
- support for podcasts
- simple artist overviews
- album & playlist overviews
- adding tracks to the queue
- liking and unliking tracks not currently being played
- liking and unliking playlists, albums
- browse through your recommendations
- category playlists
- liked & recently played songs overview
- small overview of your top played artists and songs
- media control notification
