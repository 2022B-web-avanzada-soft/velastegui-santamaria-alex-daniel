import {App, BlockTitle, List, ListItem, Navbar, Page} from "konsta/react";
import {Button} from "@mui/material";

export default function () {
    return (
        <>
            <App theme="ios">
                <Page>
                    <Navbar title="EPN | Konsta"/>
                    <BlockTitle>Links, Header, Footer</BlockTitle>
                    <List strongIos outlineIos>
                        <ListItem
                            link
                            header={
                                <Button variant="text">Text</Button>
                            }
                            title="John Doe"
                            after="Edit"
                        />
                    </List>
                </Page>
            </App>
        </>
    )
}