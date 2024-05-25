import MuiBox, { type BoxProps } from "@mui/material/Box";
import { motion } from "framer-motion";
import React from "react";

const BoxComponent = React.forwardRef((props: BoxProps, ref) => <MuiBox {...props} ref={ref} />);
const AnimatedBox = motion(BoxComponent);

export default AnimatedBox;