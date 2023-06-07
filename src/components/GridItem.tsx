import React from "react";

export default function GridItem(props: any) {
    const {item} = props;
    return (
        <tr style={{backgroundColor: item.isBackgroundColorRed ? 'red':''}}>
            <td>{item.name}</td>
            <td>{item.mailReceivedDate}</td>
            <td>{item.solutionSentDate}</td>
        </tr>
    );
}
