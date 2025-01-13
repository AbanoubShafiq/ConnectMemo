
console.info("loading moudule html ")

const getlayout = () => {
    `
    <head>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h2> Abanoub </h2>
        <h3>time => ${new Date()}</h3>
        <img src="/Capture">
    </body>    
    `
}


module.exports = {
    getlayout,
}