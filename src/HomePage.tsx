import React, { useState, MouseEventHandler } from "react";
import { Grid, Paper, List, Checkbox as CheckBox, ListItemButton, ListItemIcon, ListItemText, Collapse, ListSubheader } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import TableComponent from "./TableComponent";

function HomePage() {
    const sideBarStyle = { padding: 20, height: '90vh', width: "20%", margin: '10px', marginRight: '0px' };
    const mainPageStyle = { padding: 20, height: '90vh', width: "80%", margin: '10px', marginLeft: '0px' };

    const [open, setOpen] = useState([true,true]);
    const [sub1, setSub1] = useState([false,false]);
    const [sub2, setSub2] = useState([false,false,false]);
    

    interface Departments{
        id:number,
        open:boolean,
        sub:Array<boolean>,
        sub_departments:Array<string>,
        department:string,
        handleClick:MouseEventHandler<SVGSVGElement>,
        handleCheck:MouseEventHandler<HTMLButtonElement>,
        handleSubClick:MouseEventHandler<HTMLButtonElement>
    }

    const deparments: Array<Departments> = [
        {
            "id": 1,
            "open": open[0],
            "sub": sub1,
            "handleClick": handleClick1,
            "handleCheck": handleCheck1,
            "department": "Customer Service",
            "handleSubClick": handleSub1,
            "sub_departments": [
                "Support",
                "Customer Success"
            ]
        },
        {
            "id": 2,
            "open": open[1],
            "sub": sub2,
            "handleClick": handleClick2,
            "handleSubClick": handleSub2,
            "handleCheck": handleCheck2,
            "department": "Design",
            "sub_departments": [
                "Graphic Design",
                "Product Design",
                "Web Design"
            ]
        }
    ]

    function handleClick1() { setOpen([!open[0], open[1]]) }
    function handleClick2() { setOpen([open[0], !open[1]]) }
    function handleSub1(e) {
        const id=e.target.id;
        switch (id) {
            case "0":
                setSub1([e.target.checked, sub1[1]]);
                break;
            case "1":
                setSub1([sub1[0] , e.target.checked]);
                break;
            default:
                break;
        }
    }
    function handleSub2(e) {
        const id=e.target.id;
        switch (id) {
            case "0":
                setSub2([e.target.checked, sub2[1], sub2[2]]);
                break;
            case "1":
                setSub2([sub2[0] , e.target.checked, sub2[2]]);
                break;
            case "2":
                setSub2([sub2[0], sub2[1] , e.target.checked]);
                break;
                default:
                break;
        }
    }
    function handleCheck1(event) {
        setSub1([event.target.checked, event.target.checked]);
    }
    function handleCheck2(event) {
        setSub2([event.target.checked, event.target.checked, event.target.checked]);
    }

    function SubList(props) {
        const { dep } = props
        return (
            <>
                {dep.sub_departments.map((title: string, id: number) => {
                    return (
                        <ListItemButton sx={{ pl: 4 }} key={`${dep.department}${id}`}>
                            <ListItemIcon>
                                <CheckBox id={id.toString()} checked={dep.sub[id]} onClick={dep.handleSubClick} />
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    );
                })}
            </>
        );

    }

    return (
        <Grid style={{ display: 'flex' }}>
            <Paper elevation={10} style={sideBarStyle}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Categories
                        </ListSubheader>
                    }
                >
                    {deparments.map((dep) => {
                        const ele=dep.sub[2];
                        console.log(ele);
                        return (
                            <>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <CheckBox checked={(ele==null)?dep.sub[0]===true && dep.sub[1]===true:dep.sub[0]===true && dep.sub[1]===true && dep.sub[2]}
                                         indeterminate={(ele==null)?dep.sub[0]!==dep.sub[1]:dep.sub[0]!==dep.sub[1]||dep.sub[1]!==dep.sub[2]}
                                          onClick={dep.handleCheck} />
                                    </ListItemIcon>
                                    <ListItemText primary={dep.department} />
                                    {dep.open ? <ExpandLess onClick={dep.handleClick} /> : <ExpandMore onClick={dep.handleClick} />}
                                </ListItemButton>
                                <Collapse in={dep.open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <SubList dep={dep} />
                                    </List>
                                </Collapse>
                            </>
                        )
                    })}
                </List>
            </Paper>
            <Paper elevation={5} style={mainPageStyle}>
                <TableComponent />
            </Paper>
        </Grid>
    )
}

export default HomePage;