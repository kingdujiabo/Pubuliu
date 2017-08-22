import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "*": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "main": {
        "position": "relative"
    },
    "box": {
        "paddingTop": 15,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 15,
        "float": "left"
    },
    "pic": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "border": "1px solid #ccc",
        "borderRadius": 5,
        "boxShadow": "0 0 5px #ccc",
        "background": "#FFF"
    },
    "pic img": {
        "width": 236,
        "height": "auto",
        "opacity": 1
    },
    "pic:hover img": {
        "opacity": 0.7
    }
});