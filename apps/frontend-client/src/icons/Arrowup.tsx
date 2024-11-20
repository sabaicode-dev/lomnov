import React  from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
type prop =  {
    clasName ?: string
}

function ArrowRightCycle({clasName}:prop){
    return(
        <>
            <BsArrowLeftCircle className={clasName}/>
        </>
    )
}

export default ArrowRightCycle;