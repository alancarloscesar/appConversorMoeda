import React from 'react';

import RNPickerSelect from 'react-native-picker-select';

export default function Picker(props){

    return (

        <RNPickerSelect
        placeholder={{
            label: 'Selecione uma moeda...',
            value:null,
            color:'#000'
        }}
        items={props.moedas}
        onValueChange={(valor) => props.onChange(valor)}

        style={{
            inputIOS:{
                color: '#000',
                fontSize: 20
            },
            inputAndroid:{
                color: '#000',
                fontSize: 20
            }
        }}
        />
    );
}
