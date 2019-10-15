import * as React from "react";
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

const theme = () => createMuiTheme({

    overrides: {
        MuiFormControl: {
            marginNormal: {
                marginTop: "0 !important",
                marginBottom: 0,
            },
            root: {
                width: "100%"
            }
        },

        MuiFormHelperText: {
            root: {
                width: "100%",
                height: "10px",
                color: "#595959",
                fontFamily: "Helvetica",
                fontSize: "10px",
                lineHeight: "10px"
            }
        },
        MuiInput: {
            underline: {
                '&:before': { //underline color when textfield is inactive
                    borderBottom: "1px solid white"
                },
                '&:hover:not($disabled):before': { //underline color when hovered
                    borderBottom: "1px solid white"
                },
            }
        }
    }
});


interface IProps {

    /** Input identifier. */
    id: string;

    /** Input Placeholder. */
    placeholder?: any;

    /** Input Label . */
    label?: string;

    /**  Controlled or Uncontrolled Value. */
    value?: string;

    /** Type- text/number/email.
     * @default "text"
     * */
    type?: string;

    /** Custom Classes */
    className?: string;

    /** On change handler */
    onChange?: (e) => void;

    /** On click handler */
    onMouseUp?: (e) => void;

    /** On Focus handler */
    onKeyDown?: (e) => void;

    /** Disable the input */
    disabled?: boolean;

    /** Field Validation.*/
    error?: boolean;

    /** Some information below the field.*/
    helperText?: string;

    /** Custom Material ui input props.*/
    InputProps?: any;
    inputProps?: any;

    /** Field Validation.*/
    required?: boolean;
    autoFocus?: boolean;
    maxLength?: any;
    endAdornment?: any;
}

export const Search = (props: any) => {
    return (
        <MuiThemeProvider theme={theme()}>
            <TextField
                id="search"
                placeholder="Enter Name"
                label="Search By"
                value={props.searchName}
                type={"text"}
                margin="normal"
                className="field"
                onChange={props.onChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <i className="material-icons" onClick={props.onSearch}>
                                search
                            </i>
                        </InputAdornment>
                    ),
                }}
            />
        </MuiThemeProvider>
    );
};


