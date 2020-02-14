const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log(process.env);
    res.send(
        'Process env: '
        );
});

const port = process.env.PORT || 3535;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})