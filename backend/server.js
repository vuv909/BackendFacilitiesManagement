import app from "./src/app.js";

const PORT = process.env.PORT || 3055

const server = app.listen(PORT, () => {
    console.log('App start with port ' + PORT);
})
