import * as React from 'react';
import { Text, View } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'


interface IProps {
}
interface IState {
}
export default class PdfReaderPage extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        console.log('ADRESSE ' + this.props.route.params.uri)

        /*
        <PDFReader
                source={{
                    uri: this.props.route.params.uri 
                }}
                withPinchZoom={true}
                withScroll={true}
            />
            */
    }

    render() {

        return (
            <PDFReader
                source={{
                    uri: this.props.route.params.uri
                }}
                withPinchZoom={true}
                withScroll={true}
            />
        )
    }
}