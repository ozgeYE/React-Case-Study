import React, {useEffect} from "react";
import GridItem from "./GridItem";

export default function Grid(props: any) {
    return (
        <div>
            <table>
                <tbody>
                {props.source.map((item: any,i: number) => <GridItem item={item} key={i}></GridItem>)}
                </tbody>
            </table>
        </div>
    );
}
