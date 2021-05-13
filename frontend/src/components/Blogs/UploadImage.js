// temporary unused component


/* import react ,{useState} from "react";
import {
  IconButton,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  faceImage: {
    color: theme.palette.primary.light,
  },
}));


export default function UploadImage (props)  {

  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState('');

  const handleCapture = (event) => {
    setSelectedFile(event.target.files[0].name);
  };
 const passImageToAddNewsComponent= (image)=>{
     props.handleChosenImg(image);
 }
 passImageToAddNewsComponent(selectedFile)
 
    return (
        <>
            <input
                accept="image/jpeg"
                className={classes.input}
                id="faceImage"
                type="file"
                onChange={handleCapture}
            />
            <Tooltip title="Select Image">
                <label htmlFor="faceImage">
                    <IconButton
                        className={classes.faceImage}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                    >
                        <PhotoCamera fontSize="large" />
                    </IconButton>
                </label>
            </Tooltip>
            <label>{selectedFile ? selectedFile.name : "Select Image"}</label>. . .
      </>
    );
}
 */
       




