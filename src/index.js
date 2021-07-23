import * as todoStuff from "./todos.js";
import * as domStuff from "./domstuff.js";
import { format,formatDistanceToNowStrict  } from 'date-fns';

// have a global variable that indicates the current selected project
// need to implement the logic and done

//this index js file will be cool as hell, it will just be using the API of the 2 other files



    let d = new Date(2021,7,14) // y - m - d, months start with index 0  
    let c = format(d, 'MM dd yyyy');

    console.log(formatDistanceToNowStrict(d));
    console.log(c);
    