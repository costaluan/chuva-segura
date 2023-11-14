import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { PickerContainer, ErrorText } from './styles';

function toCapitalize(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const CityPicker = ({ control, value, onChange, errors, options }) => {
    return (
      <>
        <PickerContainer>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
              >
                <Picker.Item label="Selecione um valor" value="" />
                {options.map((option) => (
                  <Picker.Item
                    key={option}
                    label={toCapitalize(option)}
                    value={option}
                  />
                ))}
              </Picker>
            )}
            name="category"
          />
        </PickerContainer>
        {errors.category && <ErrorText>{errors.category.message}</ErrorText>}
      </>
    );
  };

export default CityPicker;
