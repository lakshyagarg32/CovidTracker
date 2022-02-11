import * as React from "react";
import { FormControl } from '@mui/material';
import {StyledOption,CustomSelect} from "./select"
import styles from "./countrypicker.module.css";

function Countrypicker({handleCountryChange,countries}){

    return(
        <FormControl className={styles.formControl}>
            <CustomSelect className={styles.temp} defaultValue="Global" onChange={function(event){
                handleCountryChange(event);
            }}>
                <StyledOption value="Global"><img
                        loading="lazy"
                        width="20"
                        src="http://webspace.ship.edu/cgboer/unflag.gif"
                        alt="Flag of World"
                        />Global</StyledOption>
                {countries.map(function(item,i){
                    return <StyledOption key={i} value={item.country}><img
                        loading="lazy"
                         width="20"
                         src={item.flag}
                         alt={`Flag of ${item.country}`}
                        />{item.country}</StyledOption>;
                })}
            </CustomSelect>
        </FormControl>
    );
}

export default Countrypicker;