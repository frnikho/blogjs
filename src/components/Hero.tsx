import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
interface HeroProps {
    title: string,
    height?: number,
    fontSize?: number,
}

const useStyles = (height: number, fontSize?: number) => makeStyles({
    root: {
        minHeight: height,
        backgroundColor: "#DFE6E9",
        backgroundImage: "/space.jpg"
    },
    title: {
        fontSize: fontSize,
        fontWeight: 500,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

const Hero: React.FC<HeroProps> = ({title, height, fontSize, children}) => {
    const classes = useStyles(height, fontSize)();
    return (
        <Grid
            className={classes.root}
            container
            alignItems="center"
            justify="center"
        >
            <Typography
            className={classes.title}
            >{title}</Typography>
        </Grid>
    )
}

Hero.defaultProps =  {
    height: 200,
    fontSize: 40,
}

export default Hero;
