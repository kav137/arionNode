"use strict";

module.exports = (dataset) => {
    let prettified = {
        data: {
            coefficients : [],
            properties : [],
            method : null
        }
    };

    dataset.forEach((item) => {
        if (item.Koefficient) {
            prettified.data.method = item.Name;
            prettified.data.coefficients = item.Koefficient;
        }
        else {
            prettified.data.properties.push(item);
        }
    })

    dataset.length = 0;
    return prettified;
};