import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { IUser } from "../../../components/shared/interface/IUser";
import DatabaseManager from "../../../database/DatabaseManager";

interface iState {
    listAllUsers: IUser[],
}
interface IProps {

}
export default class SwitchProfilePage extends React.Component<IProps, iState> {

    constructor(props: any) {
        super(props);
        this.state = {
            listAllUsers: []
        }
    }

    componentDidMount(): void {
        this.updateListUsers();
    }


    updateListUsers(): void {
        DatabaseManager.getAllUser().then((result) => this.setState({ listAllUsers: result }));
    }

    render(): JSX.Element {
        return (

            <ScrollView style={{ flex: 1 }}>
                
                {this.state.listAllUsers.map((item, index) => {
                    return (<Text>{item.firstName}</Text>)
                })
                }
            </ScrollView>

        );
    }
}