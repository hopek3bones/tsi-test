# Sport Events

### `About the Assignment`

`This is a platform for sports enthusiasts to find and join sports events near them. Users can browse a list of available events, and view details about each event.`

<br />

### Backend API Reference

| Request            | Route     | Links   |
| :------------------- | :------- | :------------ |
| `POST`           | `To create an account(Role based)` | **https://sport-event-mdcf.onrender.com/user/signup**. |
| `POST`              | `To Login (Role based)`  | **https://sport-event-mdcf.onrender.com/user/login**. |
| `GET`        | `To get all the events` | **https://sport-event-mdcf.onrender.com/event**. |
| `POST` | `To create an event` | **https://sport-event-mdcf.onrender.com/event**. |
| `PUT` | `Player can join an event` | **https://sport-event-mdcf.onrender.com/event/:id**. |
| `GET` | `To search an event by keyword` | **https://sport-event-mdcf.onrender.com/event/search?keyword=${keyword}**. |

<br />

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
