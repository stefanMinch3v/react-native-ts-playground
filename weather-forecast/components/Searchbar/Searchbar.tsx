import { TextInput } from "react-native";
import { style } from "./Searchbar.style";

type SearchbarProps = {
  onSubmit: (text: string) => Promise<void>;
};

export default function Searchbar({ onSubmit }: SearchbarProps) {
  return (
    <TextInput
      style={style.input}
      onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
      placeholder="Type a city... ex: Aarhus"
    />
  );
}
